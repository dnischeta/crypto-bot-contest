import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
  swipeBehavior,
} from '@telegram-apps/sdk-vue'

/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug: boolean): void {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug)

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc. Also, configure
  // the package.
  initSDK()

  // Mount all components used in the project.
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  swipeBehavior.isSupported() && swipeBehavior.mount()
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  backButton.isSupported() && backButton.mount()
  miniApp.mount()
  themeParams.mount()
  initData.restore()
  void viewport
    .mount()
    .then(() => {
      viewport.bindCssVars()
    })
    .catch((e: unknown) => {
      console.error('Something went wrong mounting the viewport', e)
    })

  // Define components-related CSS variables.
  miniApp.bindCssVars()
  themeParams.bindCssVars()

  swipeBehavior.disableVertical()

  // Add Eruda if needed.
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  debug && import('eruda').then(lib => lib.default.init()).catch(console.error)
}
