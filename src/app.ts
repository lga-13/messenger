
import ChatPage from "./pages/chat-page/chat-page.ts";
import Router from "./router/router.ts";
import SettingsPage from "./pages/settings-page/settings-page.ts";
import Error404Page from "./pages/error404/error404.ts";
import Error500Page from "./pages/error500/error500.ts";
import RegistrationForm from "./pages/registration-form/registration-form.ts";
import LoginForm from "./pages/login-form/login-form.ts";

const router = new Router('#app')
    .use("/404", Error404Page, {})
    .use("/505", Error500Page, {})
    .use("/settings", SettingsPage, {})
    .use("/messenger", ChatPage, {})
    .use("/sign-up", RegistrationForm, {})
    .use("/", LoginForm, {})

router.start()

