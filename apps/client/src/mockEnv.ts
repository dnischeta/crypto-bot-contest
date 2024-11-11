import { mockTelegramEnv, isTMA, parseInitData } from '@telegram-apps/sdk-vue'

// It is important, to mock the environment only for development purposes. When building the
// application, import.meta.env.DEV will become false, and the code inside will be tree-shaken,
// so you will not see it in your final bundle.
if (import.meta.env.DEV) {
  ;(() => {
    let shouldMock
    const MOCK_KEY = '____mocked'

    // We don't mock if we are already in a mini app.
    if (isTMA('simple')) {
      // We could previously mock the environment.
      // In case we did, we should do it again.
      // The reason is the page could be reloaded, and we should apply mock again, because
      // mocking also enables modifying the window object.
      shouldMock = !!sessionStorage.getItem(MOCK_KEY)
    } else {
      shouldMock = true
    }

    if (!shouldMock) {
      return
    }

    // const initDataRaw =
    // 'query_id=AAGOZTUbAwAAAI5lNRsnVWx_&user=%7B%22id%22%3A6898935182%2C%22first_name%22%3A%22kit%22%2C%22last_name%22%3A%22cat%22%2C%22username%22%3A%22kitcat111%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730564718&hash=8c6309f676412cc63bf400e6bdfde7c7fc7e1f456ca18679f0cbe55f38889ac6'
    const initDataRaw =
      'query_id=AAE_MrYIAAAAAD8ytggnTEuQ&user=%7B%22id%22%3A146158143%2C%22first_name%22%3A%22Dmitry%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22dumasiq%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730967048&hash=6d63f760b84b9475759b58b12e947091f1be69b858c602a77b1a2e619ed51ed9'
    mockTelegramEnv({
      themeParams: {
        accentTextColor: '#6ab2f2',
        bgColor: '#17212b',
        buttonColor: '#5288c1',
        buttonTextColor: '#ffffff',
        destructiveTextColor: '#ec3942',
        headerBgColor: '#17212b',
        hintColor: '#708499',
        linkColor: '#6ab3f3',
        secondaryBgColor: '#232e3c',
        sectionBgColor: '#17212b',
        sectionHeaderTextColor: '#6ab3f3',
        subtitleTextColor: '#708499',
        textColor: '#f5f5f5',
      },
      initData: parseInitData(initDataRaw),
      initDataRaw,
      version: '8',
      platform: 'tdesktop',
    })
    sessionStorage.setItem(MOCK_KEY, '1')

    console.info(
      '⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
    )
  })()
}
