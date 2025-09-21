<#import "footer.ftl" as loginFooter>
<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false>
<!DOCTYPE html>
<html class="${properties.kcHtmlClass!}" lang="en"<#if realm.internationalizationEnabled?? && realm.internationalizationEnabled> dir="ltr"</#if>>

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">

    <#if properties.meta?has_content>
        <#list properties.meta?split(' ') as meta>
            <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
        </#list>
    </#if>
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <!-- Preload Tangerine font for header -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap" rel="stylesheet">
    <#if properties.stylesCommon?has_content>
        <#list properties.stylesCommon?split(' ') as style>
            <link href="${url.resourcesCommonPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
    <#if properties.scripts?has_content>
        <#list properties.scripts?split(' ') as script>
            <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <script type="importmap">
        {
            "imports": {
                "rfc4648": "${url.resourcesCommonPath}/vendor/rfc4648/rfc4648.js"
            }
        }
    </script>
    <script src="${url.resourcesPath}/js/menu-button-links.js" type="module"></script>
    <script>
        // Enhanced Video Background Manager
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🎬 Video Background Manager: Enhanced version starting...');

            const video = document.getElementById('video-background');

            if (!video) {
                console.error('❌ Video element not found!');
                return;
            }

            console.log('✅ Video element found:', video.src);

            // Enhanced video management with multiple play attempts
            function attemptPlay() {
                return video.play().then(() => {
                    console.log('✅ Video playing successfully');
                }).catch(e => {
                    console.log('⚠️ Play attempt failed:', e.message);
                    // Try again after user interaction
                    document.addEventListener('click', () => {
                        video.play().catch(err => console.log('Click-triggered play failed:', err.message));
                    }, { once: true });
                });
            }

            // Multiple event listeners for robust playback
            video.addEventListener('loadedmetadata', function() {
                console.log('📊 Video metadata loaded, duration:', video.duration);
            });

            video.addEventListener('canplay', function() {
                console.log('🎬 Video can start playing');
                attemptPlay();
            });

            video.addEventListener('loadeddata', function() {
                console.log('📹 Video data loaded, attempting play...');
                attemptPlay();
            });

            // Handle video pause (restart immediately)
            video.addEventListener('pause', function() {
                console.log('⏸️ Video paused, restarting...');
                setTimeout(() => {
                    if (video.paused) {
                        attemptPlay();
                    }
                }, 100);
            });

            // Seamless looping
            video.addEventListener('ended', function() {
                console.log('🔄 Video ended, restarting loop...');
                video.currentTime = 0;
                attemptPlay();
            });

            // Enhanced error handling
            video.addEventListener('error', function(e) {
                console.error('❌ Video error occurred:', e);
                console.error('Video error details:', video.error);
            });

            // Stalled/waiting handlers
            video.addEventListener('stalled', function() {
                console.log('⏳ Video stalled, attempting reload...');
                video.load();
            });

            video.addEventListener('waiting', function() {
                console.log('⏳ Video waiting for data...');
            });

            // Multiple play attempts with increasing delays
            const playAttempts = [100, 500, 1000, 2000];
            playAttempts.forEach((delay, idx) => {
                setTimeout(() => {
                    if (video.paused) {
                        console.log('🎬 Play attempt ' + (idx + 1) + ' after ' + delay + 'ms...');
                        attemptPlay();
                    }
                }, delay);
            });

            // Visibility change handler to restart video when tab becomes visible
            document.addEventListener('visibilitychange', function() {
                if (!document.hidden && video.paused) {
                    console.log('👁️ Tab visible, restarting video...');
                    attemptPlay();
                }
            });

            // Loading state for form submission
            const loginForm = document.getElementById('kc-form-login');
            const submitBtn = document.querySelector('input[type="submit"], button[type="submit"]');

            if (loginForm && submitBtn) {
                loginForm.addEventListener('submit', function() {
                    submitBtn.classList.add('btn-loading');
                    submitBtn.disabled = true;

                    // Create and add spinner
                    const spinner = document.createElement('span');
                    spinner.className = 'loading-spinner';
                    submitBtn.parentNode.insertBefore(spinner, submitBtn.nextSibling);
                });
            }
        });
    </script>
    <#if scripts??>
        <#list scripts as script>
            <script src="${script}" type="text/javascript"></script>
        </#list>
    </#if>
    <script type="module">
        import { startSessionPolling } from "${url.resourcesPath}/js/authChecker.js";

        startSessionPolling(
          "${url.ssoLoginInOtherTabsUrl?no_esc}"
        );
    </script>
    <#if authenticationSession?? && authenticationSession.authSessionIdHash??>
        <script type="module">
            import { checkAuthSession } from "${url.resourcesPath}/js/authChecker.js";

            checkAuthSession(
                "${authenticationSession.authSessionIdHash}"
            );
        </script>
    </#if>
</head>

<body class="${properties.kcBodyClass!}">
<!-- Video Background -->
<video id="video-background" autoplay muted loop playsinline preload="auto" crossorigin="anonymous">
    <source src="${url.resourcesPath}/public/roud.mp4" type="video/mp4">
    <source src="${url.resourcesPath}/public/city.mp4" type="video/mp4">
    <source src="${url.resourcesPath}/public/tram.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

<div class="${properties.kcLoginClass!}">
    <div id="kc-header" class="${properties.kcHeaderClass!}">
        <div id="kc-header-wrapper"
             class="${properties.kcHeaderWrapperClass!}">${kcSanitize(msg("loginTitleHtml",(realm.displayNameHtml!'')))?no_esc}</div>
    </div>
    <div class="${properties.kcFormCardClass!}">
        <header class="${properties.kcFormHeaderClass!}">
            <#-- Internationalization temporarily disabled to fix template errors -->
        <#if !(auth?has_content && auth.showUsername() && !auth.showResetCredentials())>
            <#if displayRequiredFields>
                <div class="${properties.kcContentWrapperClass!}">
                    <div class="${properties.kcLabelWrapperClass!} subtitle">
                        <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                    </div>
                    <div class="col-md-10">
                        <h1 id="kc-page-title"><#nested "header"></h1>
                    </div>
                </div>
            <#else>
                <h1 id="kc-page-title"><#nested "header"></h1>
            </#if>
        <#else>
            <#if displayRequiredFields>
                <div class="${properties.kcContentWrapperClass!}">
                    <div class="${properties.kcLabelWrapperClass!} subtitle">
                        <span class="subtitle"><span class="required">*</span> ${msg("requiredFields")}</span>
                    </div>
                    <div class="col-md-10">
                        <#nested "show-username">
                        <div id="kc-username" class="${properties.kcFormGroupClass!}">
                            <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                            <a id="reset-login" href="${url.loginRestartFlowUrl}" aria-label="${msg("restartLoginTooltip")}">
                                <div class="kc-login-tooltip">
                                    <i class="${properties.kcResetFlowIcon!}"></i>
                                    <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            <#else>
                <#nested "show-username">
                <div id="kc-username" class="${properties.kcFormGroupClass!}">
                    <label id="kc-attempted-username">${auth.attemptedUsername}</label>
                    <a id="reset-login" href="${url.loginRestartFlowUrl}" aria-label="${msg("restartLoginTooltip")}">
                        <div class="kc-login-tooltip">
                            <i class="${properties.kcResetFlowIcon!}"></i>
                            <span class="kc-tooltip-text">${msg("restartLoginTooltip")}</span>
                        </div>
                    </a>
                </div>
            </#if>
        </#if>
      </header>
      <div id="kc-content">
        <div id="kc-content-wrapper">

          <#-- App-initiated actions should not see warning messages about the need to complete the action -->
          <#-- during login.                                                                               -->
          <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
              <div class="alert-${message.type} ${properties.kcAlertClass!} pf-m-<#if message.type = 'error'>danger<#else>${message.type}</#if>">
                  <div class="pf-c-alert__icon">
                      <#if message.type = 'success'><span class="${properties.kcFeedbackSuccessIcon!}"></span></#if>
                      <#if message.type = 'warning'><span class="${properties.kcFeedbackWarningIcon!}"></span></#if>
                      <#if message.type = 'error'><span class="${properties.kcFeedbackErrorIcon!}"></span></#if>
                      <#if message.type = 'info'><span class="${properties.kcFeedbackInfoIcon!}"></span></#if>
                  </div>
                      <span class="${properties.kcAlertTitleClass!}">${kcSanitize(message.summary)?no_esc}</span>
              </div>
          </#if>

          <#nested "form">

          <#if auth?has_content && auth.showTryAnotherWayLink()>
              <form id="kc-select-try-another-way-form" action="${url.loginAction}" method="post">
                  <div class="${properties.kcFormGroupClass!}">
                      <input type="hidden" name="tryAnotherWay" value="on"/>
                      <a href="#" id="try-another-way"
                         onclick="document.forms['kc-select-try-another-way-form'].requestSubmit();return false;">${msg("doTryAnotherWay")}</a>
                  </div>
              </form>
          </#if>

          <#nested "socialProviders">

          <#if displayInfo>
              <div id="kc-info" class="${properties.kcSignUpClass!}">
                  <div id="kc-info-wrapper" class="${properties.kcInfoAreaWrapperClass!}">
                      <#nested "info">
                  </div>
              </div>
          </#if>
        </div>
      </div>

      <@loginFooter.content/>
    </div>
  </div>
</body>
</html>
</#macro>