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
    //物件初始化，不然會噴調
    var aa = Object.assign(this.state.News);
    result.data.map((data) => {
      aa.new_LanList.push({});
    });


    self.setState({
      Sys_Language_List: result.data,
      News: aa,
    });
  }).catch((error) => {
    console.log(error)
  });

}




export function HandleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  var new_News = Object.assign(this.state.News);
  new_News[name] = value;

  this.setState({
    News: new_News,
  });
}

//News_lan
export function HandleInputChange_By_New_LanList(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  const index = event.currentTarget.getAttribute('data-index');
  var new_News = Object.assign(this.state.News);

  new_News.new_LanList[index][name] = value;
  this.setState({
    News: new_News,
  });
}


export function HandleInputChange_By_New_LanList_CKEditor(obj){
  const value = obj.value;
  const name = obj.name;  
  const index = obj.index;
  var new_News = Object.assign(this.state.News);

  new_News.new_LanList[index][name] = value;
  this.setState({
    News: new_News,
  });
}

//抓取資料
// export function GetData() {
//     const self = this;

//         axios({
//           url: `/api/News/Get_News?id=${this.props.match.params.id}`,
//           method: 'GET',
//           data: {
//           }
//         }).then((result) => {
//           // console.log(result.data);
//           self.setState({
//             News: result.data
//           });
//         }).catch((error) => {
//           console.log(error)
//         });
// }