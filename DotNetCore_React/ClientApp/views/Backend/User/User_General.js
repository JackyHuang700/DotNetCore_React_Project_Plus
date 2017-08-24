import axios from 'axios';


export const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//取得角色
export function GetRoleList() {
    const self = this;
    //抓取角色權限
    axios({
        url: `/api/Role/Role_View`,
        method: 'GET',
        data: {
        }
    }).then((result) => {
        var a = [];
        result.data.map((c) => {
            a.push({
                name: c.name,
                value: c.id
            });
        });


        let newUser = Object.assign(self.state.User);

        //填入預設值
        const aa = a.find(c => c.value == newUser.roleId);
        if (aa) {
            newUser.roleId = aa.value;
        } else {
            newUser.roleId = a[0].value;
        }

        self.setState({
            RoleList: a,
            User: newUser,
        });
    }).catch((error) => {
        console.log(error)
    });
}   