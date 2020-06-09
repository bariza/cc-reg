import {createSelector} from '@ngrx/store';
import {SelfRegisterState} from '../../models';


export const selectSelfRegisterState = state => state.selfRegister;


export const getLanguageButtonText = createSelector(
  selectSelfRegisterState,
  selfReg => selfReg && selfReg.languageButtonText
);

export const getApplicationLanguage = createSelector(
  selectSelfRegisterState,
  (selfReg: SelfRegisterState) => selfReg && selfReg.applicationLanguage
);

