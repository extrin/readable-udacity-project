import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Categories from './Categories';
import { connect } from 'react-redux';
import { selectCategory } from '../Actions/Category';
import { Link } from 'react-router-dom';

class CustomAppBar extends React.Component {
  state = { drawerOpen: false };

  handleDrawer = () => this.setState({ drawerOpen: !this.state.drawerOpen });

  render() {
    return (
      <div className="custom-app-bar">
        <AppBar
          title={
            <Link style={{ 'text-decoration': 'none', color: 'white' }} to="/">
              Readable
            </Link>
          }
          onTitleClick={() => this.props.openCategory()}
          showMenuIconButton={true}
          onLeftIconButtonClick={() => this.handleDrawer()}
          style={{ position: 'fixed' }}
        />
        <Drawer
          children={<Categories />}
          open={this.state.drawerOpen}
          onRequestChange={drawerOpen => this.setState({ drawerOpen })}
          docked={false}
          width={200}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openCategory: category => dispatch(selectCategory(category))
});

export default connect(null, mapDispatchToProps)(CustomAppBar);
