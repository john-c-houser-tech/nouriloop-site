// Contact-form checks. The form posts to the NouriLoop app, which refuses a post that
// lacks the signed token fetched here (or the Cloudflare Turnstile answer, once the app
// has Turnstile on). The Turnstile site key comes from the app, not from this page, and
// Cloudflare's script is loaded only when the app hands one out.
(function () {
  var form = document.querySelector('form[action$="/site-contact"]');
  if (!form) { return; }

  var api = 'https://app.nouriloop.com';
  var token = form.querySelector('input[name="ft"]');
  var holder = document.getElementById('c-turnstile');
  var send = form.querySelector('button[type="submit"]');
  var widgetId = null;

  function renderWidget(siteKey) {
    send.disabled = true;
    widgetId = window.turnstile.render(holder, {
      sitekey: siteKey,
      callback: function () { send.disabled = false; },
      'expired-callback': function () { send.disabled = true; },
      // If Cloudflare's check itself breaks, let the visitor try anyway; the app then
      // sends them to the page that gives our email address and phone number.
      'error-callback': function () { send.disabled = false; }
    });
  }

  function showWidget(siteKey) {
    if (widgetId !== null) {
      send.disabled = true;
      window.turnstile.reset(widgetId);
    } else if (window.turnstile) {
      renderWidget(siteKey);
    } else {
      var script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = function () { renderWidget(siteKey); };
      document.head.appendChild(script);
    }
  }

  function load() {
    fetch(api + '/site-contact/token', { credentials: 'omit', cache: 'no-store' })
      .then(function (response) { return response.ok ? response.json() : Promise.reject(); })
      .then(function (data) {
        token.value = data.token || '';
        if (data.turnstileSiteKey) { showWidget(data.turnstileSiteKey); }
      })
      .catch(function () { /* the app will point the visitor to email or phone */ });
  }

  load();
  // A token is good for two hours; ask again before a tab left open that long runs out.
  setInterval(load, 90 * 60 * 1000);
  // Back to a page kept in the browser's cache: the token and the single-use Turnstile
  // answer on it are spent, so ask for fresh ones.
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) { load(); }
  });
}());
