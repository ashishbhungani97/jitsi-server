// @flow

import React, { Component } from 'react';

import { IconMicSlash } from '../../../base/icons';
import { BaseIndicator } from '../../../base/react';

/**
 * Thumbnail badge for displaying the audio mute status of a participant.
 */
export default class AudioMutedIndicator extends Component<{}> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <BaseIndicator icon = { IconMicSlash } />
        );
    }
}
