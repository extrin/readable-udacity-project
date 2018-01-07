import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Categories from './Categories';
import { Link } from 'react-router-dom';

class CustomAppBar extends React.Component {
  state = { drawerOpen: false };

  handleDrawer = () => this.setState({ drawerOpen: !this.state.drawerOpen });

  render() {
    return (
      <div className="custom-app-bar">
        <AppBar
          title={
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
              Readable
            </Link>
          }
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

export default CustomAppBar;
