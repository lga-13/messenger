
import ChatPage, {chatPage} from "./pages/chat-page/chat-page.ts";
import Router from "./router/router.ts";
import SettingsPage, {settingsPage} from "./pages/settings-page/settings-page.ts";
import registrationForm from "./pages/registration-form/registration-form.ts";
import loginForm from "./pages/login-form/login-form.ts";
import Error404Page, {error404Page} from "./pages/error404/error404.ts";
import Error500Page, {error500Page} from "./pages/error500/error500.ts";
import RegistrationForm from "./pages/registration-form/registration-form.ts";
import LoginForm from "./pages/login-form/login-form.ts";

const router = new Router('#app')
    .use("/", ChatPage, {})
    .use("account/", SettingsPage, {})
    .use("/signup", RegistrationForm, {})
    .use("/login", LoginForm, {})
    .use("/404", Error404Page, {})
    .use("/404", Error500Page, {})