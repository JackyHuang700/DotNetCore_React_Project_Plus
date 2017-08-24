import axios from 'axios';


export const email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//取得角色
export function GetRoleList() {
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


        let newUser = Object.assign(this.state.User);
        newUser.roleId = result.data[0].id;
        this.setState({
            RoleList: a,
            User: newUser,
        });
    }).catch((error) => {
        console.log(error)
    });
}