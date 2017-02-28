import {riot, template, Element} from '../riot-ts';
import * as templates from '../../templates/templates';

@template(templates.homePage.HomePageTemplate)
export default class HomePage extends Element{
}


@template(templates.homePage.HomePageFooterTemplate)
class HomePageFooter extends Element{

}

@template(templates.homePage.HomePageBodyTemplate)
class HomePageBody extends Element{
}
