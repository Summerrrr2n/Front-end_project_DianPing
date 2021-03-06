import React, { Component } from 'react'
import Category from './components/Category'
import Headline from './components/Headline'
import Discount from './components/Discount'
import Likelist from './components/Likelist'
import HomeHeader from './components/HomeHeader'
import Footer from '../../components/Footer'
import Activity from './components/Activity'
import Banner from '../../components/Banner'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as homeActions, 
    getLikes, 
    getDiscounts, 
    getPageCountOfLikes, 
    getLikesIsFetching} from '../../redux/modules/home';


class Home extends Component {
    render() {
        const {likes, discounts, pageCount} = this.props
        return (
            <div>
                <HomeHeader/>
                <Banner/>
                <Category/>
                <Headline/>
                <Activity/>
                <Discount data={discounts}/>
                <Likelist data={likes} pageCount={pageCount}
                fetchData={this.fetchMoreLikes}/>
                <Footer/>
            </div>
        )
    }

    componentDidMount() {
        this.props.homeActions.loadDiscounts()
    }

    fetchMoreLikes = () => {
        this.props.homeActions.loadLikes()
    }
}


const mapStateToProps = (state, Props) =>{
    return {
        likes: getLikes(state),
        discounts: getDiscounts(state),
        pageCount: getPageCountOfLikes(state),
        isFetching: getLikesIsFetching(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);