import React, { Component } from 'react'
import LikeItem from './LikeItem'
import Loading from '../../../../components/Loading'
import './style.css'





export default class Likelist extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.removeListener = false;
    }
    render() {
        const {data, pageCount} = this.props;
        return (
            <div ref={this.myRef} className='likeList'>
                <div className='likeList__header'>猜你喜欢</div>
                <div className='likeList__list'>
                    {
                        data.map((item,index) => {
                            return <LikeItem key={index} data={item}/>
                        })
                    }
                </div>
                {pageCount < 3 ? (
                    <Loading />
                    ) : (
                    <div className="likeList__viewAll">查看更多</div>
                    )}
            </div>
        )
    }


    componentDidMount() {   
        if(this.props.pageCount < 3) {
            document.addEventListener('scroll', this.handleScroll);
        } else {
            this.removeListener = true;
        }
        if(this.props.pageCount === 0) {
            this.props.fetchData();
        }        
    }

    componentDidUpdate() {
        if(this.props.pageCounts >=3 && !this.removeListener) {
            document.removeEventListener('scroll', this.handleScroll);
            this.removeListener = true;
        }
    }

    componentWillUnmount() {
        if(!this.removeListener) {
            document.removeEventListener('scroll', this.handleScroll);
        }
    }

    handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        || document.body.scrollTop;
        const screenHeight = document.documentElement.clientHeight;
        const likeListTop = this.myRef.current.offsetTop;
        const likeListHeight = this.myRef.current.offsetHeight;
        if (scrollTop >= likeListHeight + likeListTop - screenHeight) {
            this.props.fetchData()
        }

    }
}
