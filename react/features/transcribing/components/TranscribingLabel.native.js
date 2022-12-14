// @flow

import React, { Component } from 'react';

import { translate } from '../../base/i18n';
import { Label } from '../../base/label';
import { connect } from '../../base/redux';

import { type Props, _mapStateToProps } from './AbstractTranscribingLabel';

/**
 * React {@code Component} for displaying a label when a transcriber is in the
 * conference.
 *
 * @augments Component
 */
class TranscribingLabel extends Component<Props> {

    /**
     * Renders the platform-specific label component.
     *
     * @inheritdoc
     */
    render() {
        if (!this.props._showLabel) {
            return null;
        }

        return <Label text = { this.props.t('transcribing.tr') } />;
    }
}

export default translate(connect(_mapStateToProps)(TranscribingLabel));
