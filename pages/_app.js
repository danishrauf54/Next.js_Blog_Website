import '@/styles/globals.css';
import { wrapper } from '@/store';
import Navbar from '@/components/Navbar';

function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <>
      <Navbar />
      <main className="container-narrow py-8">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default wrapper.withRedux(App);
