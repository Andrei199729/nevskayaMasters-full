import {NavigationProp} from '@react-navigation/native';
import {ReactNode} from 'react';

export enum ObjectStatus {
  Created = 'created',
  Running = 'running',
  Completed = 'completed',
}

export enum PathScreenHeader {
  Search = 'Search',
  Filter = 'Filter',
  Profile = 'Profile',
}

export enum PathScreenAuth {
  Register = 'Register',
  Login = 'Login',
  RestorePassword = 'RestorePassword',
  Success = 'Success',
  NewPassword = 'NewPassword',
  Splash = 'Splash',
  Policy = 'Policy',
}

export enum PathScreen {
  Product = 'Product',
  UnwrappedProduct = 'UnwrappedProduct',
}

export enum StateElement {
  Ventilation = 'ventilation',
  Door = 'elementDoor',
  Window = 'elementWindow',
  Socket = 'elementSocket',
  Battery = 'elementBattery',
}

export enum ChoiceRights {
  Supervisor = 'supervisor',
  Manager = 'manager',
  default = '',
}

export enum ChoiceRightsText {
  Supervisor = 'Руководитель',
  Manager = 'Менеджер',
}

export type TStateElement =
  | StateElement.Ventilation
  | StateElement.Door
  | StateElement.Window
  | StateElement.Socket
  | StateElement.Battery;

export enum DasharrayStrokeValue {
  Solid = '0',
  Dotted = '10',
}

export enum ClickSelection {
  Wall = 'wall',
  Button = 'button',
}

export enum ClickButtonBlockDimensions {
  Width = 'width',
  Height = 'height',
  Elements = 'elements',
}

export enum Mode {
  Edit = 'edit',
  View = 'view',
}

export enum StatusButton {
  SaveButton = 'savebutton',
  DisabledButton = 'disabledbutton',
}

export type TClickButtonBlockDimensions =
  | ClickButtonBlockDimensions.Width
  | ClickButtonBlockDimensions.Height
  | ClickButtonBlockDimensions.Elements;

export interface IMainScreen {
  children: ReactNode;
  mainTitle?: string;
  path?: string;
  navigation?: string;
  textBtn?: string;
  pathLink?: string;
}

export interface ISelectOption {
  text: string;
  id: number;
}

export interface IDataItem {
  id: string;
  name: string;
}

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  NewPassword: undefined;
  Register: undefined;
  RestorePassword: undefined;
  Success: undefined;
  SuccessScreen: undefined;
  FormDataAddProduct: undefined;
  Main: undefined;
  UnwrappedProduct?: {
    dataProduct?: IDrawing[];
    nameRoom?: string;
    isNewObject?: boolean;
  };
  Product: undefined;
  Policy: undefined;
  Filter: undefined;
  Search: undefined;
  CreateProject: undefined;
  Loader: undefined;
};

export interface IWallSize {
  id: number;
  heightRight?: string;
  heightLeft?: string;
  widthTop?: string;
  widthBottom?: string;
  wallAngleDegree?: string;
  radiusWall?: string;
  valueDegree?: string;
  arrElements?: {
    elements?: IElementWallRoom[];
  };
}

export interface IWall {
  size: IWallSize;
  numberWall: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IShape {
  id: number;
  path: string;
  length: number;
  points: IPoint[];
}

export interface IPaths {
  path: string;
  length: number;
}

export interface IDrawingData {
  numberWall: number;
  countWallDraw: number;
  shapes: IShape[];
  walls: IWall[];
}

export interface IDrawing {
  drawingData: IDrawingData;
}

export interface INavigationScreenProps {
  navigation: NavigationProp<RootStackParamList, keyof RootStackParamList>;
}

interface IElementDataObj {
  nameElement: string;
  stateElement: string;
  id: number;
}

export interface IElementWallRoom {
  id: number;
  roomIndex?: string | null;
  data: IElementData;
  dataObj: IElementDataObj;
}

export interface IExternalSizeWall {
  id?: number;
  widthTop?: string;
  widthBottom?: string;
  heightRight?: string;
  heightLeft?: string;
  radiusWall?: string;
  valueDegree?: string;
  wallAngleDegree?: string;
}

export interface ISaveSizeWall {
  [key: number]: {
    size: IExternalSizeWall; // Здесь описано, что каждый элемент по индексу содержит объект с `size`
    numberWall: number;
  };
}

export interface IAddBlockDimensions {
  numberWall: number;
  externalData?: IWallSize;
  index: number;
  currentWall: boolean;
  mode: Mode;
}

export interface IDataElementsWall {
  id: number;
  nameElement: string;
  stateElement: string;
}

export interface IElementWall {
  numberElement?: number;
  data: IElementData;
  dataObj: IDataElementsWall;
}

export interface IElementData {
  nameElementWall: string;
  heightRight: string;
  widthTop: string;
  widthBottom: string;
  heightLeft: string;
  radiusElement: string;
  locationElementTop: string;
  locationElementRight: string;
  locationElementLeft: string;
  locationElementBottom: string;
}

export interface IProductRoom {
  dataProduct: IDrawing[];
  nameRoom: string;
  _id?: string;
  owner: string;
  apartment?: string;
  createdAt?: string;
}

export interface INormalizedSize {
  addressApplication: string;
  id: number;
  numberApplication: number;
  nameCompany: string;
  telSalon: string;
  telManager: string;
  telClient: string;
  telForeman: string;
  dateRegistration?: string;
  nameClient: string;
  price: string;
  status: string;
}

export interface IApartments {
  _id: string;
  dataApplication: INormalizedSize;
  owner: string;
  rooms: string[];
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserData {
  email: string;
  password: string;
  roles: ChoiceRights;
  _id: string;
}

export interface IUserDataRegister {
  _id: string;
  email: string;
  roles: ChoiceRights;
}
