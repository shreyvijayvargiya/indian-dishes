import React, { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "utils/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "react-query";
import { ParallaxProvider } from "react-scroll-parallax";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import "../styles.css";
import "../nprogress.css";
import Body from "modules/Body";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnMount: false,
				staleTime: 24 * 60 * 60 * 1000,
			},
		},
	});
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<MantineProvider withGlobalStyles withNormalizeCSS>
					<ParallaxProvider>
						<Body>
							<Component {...pageProps} />
						</Body>
					</ParallaxProvider>
				</MantineProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
