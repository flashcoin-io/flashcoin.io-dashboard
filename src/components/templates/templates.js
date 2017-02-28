import LoadingIndicatorTemplate from './loading-indicator.html!text';

import LandingPageTemplate from './landing-page/index.html!text';
import LaningPageHeaderTemplate from './landing-page/header.html!text';
import LaningPageLoginFormTemplate from './landing-page/login-form.html!text';
import LaningPageFooterTemplate from './landing-page/footer.html!text';

import HomePageTemplate from './home-page/index.html!text';
import HomePageFooterTemplate from './home-page/footer.html!text';
import HomePageBodyTemplate from './home-page/body.html!text';

import AppTemplate from './app.html!text';

var landingPage = {
    LandingPageTemplate,
    LaningPageHeaderTemplate,
    LaningPageLoginFormTemplate,
    LaningPageFooterTemplate
}

var homePage = {
    HomePageTemplate,
    HomePageBodyTemplate,
    HomePageFooterTemplate
}

export {
    AppTemplate,
    LoadingIndicatorTemplate,
    landingPage,
    homePage
};
