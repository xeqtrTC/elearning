import {useContext} from 'react';
import { UseAuthContextType } from './authContext';
import AuthContextStateProvider from './authContext'

const UseAuthContext = (): UseAuthContextType => {
  return useContext(AuthContextStateProvider);
};

export default UseAuthContext;