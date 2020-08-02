import { ChangeLang  } from '../types/Langue';
import { ruLang } from '../LangRu';
import { uzLang } from '../LangUZ';



export const LangueReducer = ( state = ruLang, action ) => {
    switch(action.type){
        case ChangeLang.uz:
            return{
               state : uzLang
            };break;
        default:
            return {
                state : ruLang
            }
    }
}