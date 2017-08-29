import axios from 'axios';

//抓取系統語言
// export function Get_Sys_Language() {
//   const self = this;

//   axios({
//       url: `/api/Sys_Language/Sys_Language_View`,
//       method: 'GET',
//       data: {
//       }
//   }).then((result) => {
//       // console.log(`Get_Sys_Language)`, result.data);

//       let aa = Object.assign(self.state.News);

//       if (aa.new_LanList.length === 0) {
//           result.data.map((data, index) => {
//               // debugger
//               aa.new_LanList[index] = new Object();
//               aa.new_LanList[index].languageId = data.id;
//           });
          
          
//       }

//       self.setState({
//           Sys_Language_List: result.data,
//           News: aa,
//       });
//   }).catch((error) => {
//       console.log(error)
//   });

// }



export function HandleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  var new_News = Object.assign(this.state.viewModel);
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
  var new_News = Object.assign(this.state.viewModel);

  new_News.lanList[index][name] = value;
  this.setState({
    viewModel: new_News,
  });
}


export function HandleInputChange_By_New_LanList_CKEditor(obj){
  const value = obj.value;
  const name = obj.name;  
  const index = obj.index;
  var new_News = Object.assign(this.state.viewModel);

  new_News.lanList[index][name] = value;
  this.setState({
    viewModel: new_News,
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