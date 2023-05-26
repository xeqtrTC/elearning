import {useContext} from 'react';
import { UseContextType } from './Context';
import ContextStateProvider from './Context'

const UseContextState = (): UseContextType => {
  return useContext(ContextStateProvider);
};

export default UseContextState;