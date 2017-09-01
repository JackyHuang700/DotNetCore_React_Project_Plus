import axios from 'axios';



//抓取類別
export function Get_Category() {
    const self = this;
    //抓取角色權限
    axios({
        url: `/api/Product_Category/Product_Category_View`,
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


        let newAboutUs = Object.assign(self.state.viewModel);

        //填入預設值
        const aa = a.find(c => c.value == newAboutUs.categoryId);
        if (aa) {
            newAboutUs.categoryId = aa.value;
        } else {
            newAboutUs.categoryId = a[0].value;
        }

        newAboutUs.categoryList = a;


        self.setState({
            viewModel: newAboutUs,
        });
    }).catch((error) => {
        console.log(error)
    });
}



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


export function HandleInputChange_By_LanList(event) {
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

// export function HandleInputChange_By_ImageList(event) {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;
//     const index = event.currentTarget.getAttribute('data-index');
//     var new_News = Object.assign(this.state.viewModel);

//     new_News.imageList[index][name] = value;
//     this.setState({
//         viewModel: new_News,
//     });
// }


export function Add_ImageList(json) {
    let currentImageList = this.state.imageList;
    currentImageList.push({
        image: json.image,
        description: json.description,
    });

    this.setState({
        imageList : currentImageList
    });
}

export function Del_ImageList(fileName) {
    let currentImageList = this.state.imageList;
    currentImageList.splice(this.state.imageList.indexOf(fileName));
    this.setState({
        imageList : currentImageList
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
        url: `/api/Product/Get_Product?id=${this.props.match.params.id}`,
        method: 'GET',
        data: {
        }
    }).then((result) => {
        self.setState({
            viewModel: result.data,
            imageList: result.data.listImage
        }, ()=>{
            self.Get_Sys_Language();
        });
    }).catch((error) => {
        console.log(error)
    });

}