import App, { AppContext, AppInitialProps } from 'next/app';

import { Root } from 'components/pages/_app/Root';
import { Hydrate } from 'react-query/hydration';
import { captureException } from 'services/sentry';
import '../public/fonts.css';
import 'customization/theme/style.css';
import 'tailwindcss/tailwind.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../public/style.css';

import { ReactQueryDevtools } from 'react-query/devtools';
import { ListAndMapProvider } from 'modules/map/ListAndMapContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getHeaderConfig } from 'modules/header/utills';
import { flattenMessages } from 'services/i18n/intl';

const queryClient = new QueryClient();

const loadLocales = async () => {
  const loadedLanguages = await Promise.all(
    getHeaderConfig().menu.supportedLanguages.map(async language => {
      const messages = await import(`../translations/${language}.json`);
      const customMessages = await import(`../../customization/translations/${language}.json`);
      return {
        [language]: {
          ...flattenMessages(messages),
          ...flattenMessages(customMessages),
        },
      };
    }),
  );
  return loadedLanguages.reduce(
    (messages, currentMessages) => ({
      ...messages,
      ...currentMessages,
    }),
    {},
  );
};

interface AppProps extends AppInitialProps {
  hasError: boolean;
  errorEventId?: string;
  messages: {
    [language: string]: {
      [messageId: string]: string;
    };
  };
}

class MyApp extends App<AppProps> {
  static async getInitialProps(props: AppContext): Promise<AppProps> {
    const { Component, ctx } = props;
    try {
      const pageProps =
        Component.getInitialProps !== undefined ? await Component.getInitialProps(ctx) : {};
      const messages = await loadLocales();
      return { pageProps, hasError: false, errorEventId: undefined, messages };
    } catch (error) {
      // Capture errors that happen during a page's getInitialProps.
      // This will work on both client and server sides.
      const errorEventId = captureException(error, ctx);
      return {
        hasError: true,
        errorEventId,
        pageProps: {},
        messages: {},
      };
    }
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { Component, pageProps, hasError, errorEventId, messages } = this.props;
    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Root hasError={hasError} errorEventId={errorEventId} messages={messages}>
            <ListAndMapProvider>
              <Component {...pageProps} />
            </ListAndMapProvider>
          </Root>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    );
  }
}

export default MyApp;
