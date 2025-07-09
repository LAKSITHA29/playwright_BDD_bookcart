import { Page } from "@playwright/test";
import { Logger } from "winston";
import LoginPage from '../pages/loginPage';
import HeaderPage from '../pages/headerPage'
import AddToCartPage from "../pages/addCartPage";

export const pageFixture = {
  //@ts-ignore
  page: undefined as Page,
  //@ts-ignore
  logger: undefined as Logger,
  loginPage: undefined as unknown as LoginPage,
  headerPage: undefined as unknown as HeaderPage,
  addToCartPage: undefined as unknown as AddToCartPage
};