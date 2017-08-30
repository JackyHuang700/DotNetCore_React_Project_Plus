import axios from 'axios';

//抓取系統語言
export function Get_Sys_Language() {
    const self = this;

    axios({
        url: `/api/Sys_Language/Sys_Language_View`,
        method: 'GET',
        data: {
        }
    }).then((result) => {
        // console.log(`Get_Sys_Language)`, result.data);
        let aa = Object.assign(self.state.viewModel);
        if (aa.lanList.length === 0) {
            result.data.map((data, index) => {
                // debugger
                aa.lanList[index] = new Object();
                aa.lanList[index].languageId = data.id;
            });
        }


        self.setState({
            Sys_Language_List: result.data,
            viewModel: aa,
        });
    }).catch((error) => {
        console.log(error)
    });

}
