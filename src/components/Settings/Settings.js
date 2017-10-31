import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { compose } from 'recompose';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import { PageHeader } from '../Common/PageHeader';

import { actions as layoutActions } from '../../redux/modules/layout';
import { selectCurrentKapp } from '../../redux/modules/kinops';

const SettingsComponent = props => {
  const { profile, skin, topNavbar, boxed, fixed } = props;
  const { changeSkin, toggleFixed, toggleBoxed, toggleTopNavigation } = props;

  return(
    <div>
      <PageHeader
        title="Settings"
        breadcrumbs={[{ title: 'Settings' }]}
      />
      <div className="content">
        <FormGroup>
          <Label for="skinSelector">Select a Skin</Label>
          <Input
            type="select"
            name="skinSelector"
            value={skin}
            id="skinSelector"
            onChange={(event) => changeSkin(event.target.value)}
          >
            <option value="skin-blue">Blue</option>
            <option value="skin-blue-light">Blue Light</option>
            <option value="skin-yellow">Yellow</option>
            <option value="skin-yellow-light">Yellow Light</option>
            <option value="skin-green">Green</option>
            <option value="skin-green-light">Green Light</option>
            <option value="skin-purple">Purple</option>
            <option value="skin-purple-light">Purple Light</option>
            <option value="skin-red">Red</option>
            <option value="skin-red-light">Red Light</option>
            <option value="skin-black">Black</option>
            <option value="skin-black-light">Black Light</option>
          </Input>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input checked={topNavbar} onChange={() => toggleTopNavigation()}type="checkbox" />{' '}
            Top Navigation
          </Label>
        </FormGroup>
        { !boxed &&
          <FormGroup check>
            <Label check>
              <Input checked={fixed} onChange={() => toggleFixed()} type="checkbox" />{' '}
              Fixed Header & Sidebar
            </Label>
          </FormGroup>
        }
        { !fixed &&
          <FormGroup check>
            <Label check>
              <Input checked={boxed} onChange={() => toggleBoxed()} type="checkbox" />{' '}
              Boxed layout that stretches only to 1250px
            </Label>
          </FormGroup>
        }
        { profile.spaceAdmin &&
          <Button>Apply Settings</Button>
        }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  space: state.kinops.space,
  kapp: selectCurrentKapp(state),
  profile: state.kinops.profile,
  skin: state.layout.skin,
  topNavbar: state.layout.topNavbar,
  boxed: state.layout.boxed,
  fixed: state.layout.fixed,
});

const mapDispatchToProps = {
  push,
  changeSkin: layoutActions.changeSkin,
  toggleBoxed: layoutActions.toggleBoxed,
  toggleFixed: layoutActions.toggleFixed,
  toggleTopNavigation: layoutActions.toggleTopNavigation,
};

export const Settings = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SettingsComponent);
