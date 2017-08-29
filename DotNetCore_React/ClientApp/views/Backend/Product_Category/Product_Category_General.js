import axios from 'axios';

export function HandleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    var new_News = Object.assign(this.state.viewModel);
    new_News[name] = value;

    this.setState({
        viewModel: new_News,
    });
}


export function HandleInputChange_LanList(event) {
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


export function HandleInputChange_By_LanList_CKEditor(obj) {
    const value = obj.value;
    const name = obj.name;
    const index = obj.index;
    var new_News = Object.assign(this.state.viewModel);

    new_News.lanList[index][name] = value;
    this.setState({
        viewModel: new_News,
    });
}


export function GetData() {
    const self = this;

    axios({
        url: `/api/Product_Category/Get_Product_Category?id=${this.props.match.params.id}`,
        method: 'GET',
        data: {
        }
    }).then((result) => {
        self.setState({
            viewModel: result.data
        }, ()=>{
            self.Get_Sys_Language();
        });
    }).catch((error) => {
        console.log(error)
    });

}