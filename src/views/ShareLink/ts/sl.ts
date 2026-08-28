import {ref, type Ref} from "vue";

export default function (){
    const expirationDate:Ref<string>=ref('');

    return {
        expirationDate,
    }
}