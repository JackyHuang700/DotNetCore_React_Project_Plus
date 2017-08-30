export const formatDate = "YYYY/MM/DD";

export function HandleInputChange_CreateDate(date) {
    var new_News = Object.assign(this.state.viewModel);
    new_News['createDate'] = date;

    this.setState({
        viewModel: new_News,
    });

    console.log(new_News.createDate);
}

export function HandleInputChange_UpdateDate(date) {
    var new_News = Object.assign(this.state.viewModel);
    new_News['updateDate'] = date;

    this.setState({
        viewModel: new_News,
    });

    console.log(new_News.updateDate);
}


export function HandleInputChange_StartDate(date) {
    var new_News = Object.assign(this.state.viewModel);
    new_News['startDate'] = date;

    this.setState({
        viewModel: new_News,
    });

    console.log(new_News.startDate);
}

export function HandleInputChange_EndDate(date) {
    var new_News = Object.assign(this.state.viewModel);
    new_News['endDate'] = date;

    this.setState({
        viewModel: new_News,
    });

    console.log(new_News.endDate);
}