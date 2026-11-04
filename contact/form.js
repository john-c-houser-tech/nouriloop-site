// Contact-form checks. The form posts to the NouriLoop app, which refuses a post that
// lacks the signed token fetched here (or the Cloudflare Turnstile answer, once the app
// has Turnstile on). The Turnstile site key comes from the app, not from this page, and
// Cloudflare's script is loaded only when the app hands one out.
//
// The Send button stays disabled until both checks can pass: the token has to be at least
// three seconds old (the app turns away anything quicker than a person could be) and, when
// Turnstile is on, the widget has to be solved. If either service can't be reached the
// button is enabled anyway, and the app then points the visitor to our email and phone.
(function () {
  var form = document.querySelector('form[action$="/site-contact"]');
  if (!form) { return; }

  var api = 'https://app.nouriloop.com';
  var minTokenAge = 3500; // the app's minimum is 3 s; the margin covers clock rounding
  var token = form.querySelector('input[name="ft"]');
  var holder = document.getElementById('c-turnstile');
  var send = form.querySelector('button[type="submit"]');
  var widgetId = null;
  var tokenReady = false;
  var captchaReady = true;
  var tokenTimer = null;

  function update() { send.disabled = !(tokenReady && captchaReady); }

  function renderWidget(siteKey) {
    widgetId = window.turnstile.render(holder, {
      sitekey: siteKey,
      callback: function () { captchaReady = true; update(); },
      'expired-callback': function () { captchaReady = false; update(); },
      'error-callback': function () { captchaReady = true; update(); }
    });
  }

  function showWidget(siteKey) {
    captchaReady = false;
    if (widgetId !== null) {
      window.turnstile.reset(widgetId);
    } else if (window.turnstile) {
      renderWidget(siteKey);
    } else {
      var script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = function () { renderWidget(siteKey); };
      script.onerror = function () { captchaReady = true; update(); };
      document.head.appendChild(script);
    }
  }

  function load() {
    tokenReady = false;
    token.value = '';
    clearTimeout(tokenTimer);
    update();
    fetch(api + '/site-contact/token', { credentials: 'omit', cache: 'no-store' })
      .then(function (response) { return response.ok ? response.json() : Promise.reject(); })
      .then(function (data) {
        token.value = data.token || '';
        if (data.turnstileSiteKey) { showWidget(data.turnstileSiteKey); }
        tokenTimer = setTimeout(function () { tokenReady = true; update(); }, minTokenAge);
      })
      .catch(function () {
        // The app is unreachable: let the visitor try; the app's problem page gives our contacts.
        tokenReady = true;
        captchaReady = true;
        update();
      });
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
