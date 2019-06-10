
import { message } from 'antd';

export function getData(result) {
    if(result.data.status!=="200"){
        message.error(result.data.msg);
        return undefined;
    }else{
        return result.data.data;
    }
}

