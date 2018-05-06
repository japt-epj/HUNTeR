export default {
    getLoadingScreen(){
        return (
            <Dimmer active inverted key={'dimmer'}>
                <Loader size="large">Loading</Loader>
            </Dimmer>
        );
    },

}