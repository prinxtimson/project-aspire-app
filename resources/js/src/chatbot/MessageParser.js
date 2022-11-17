class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }
    parse(message) {
        // console.log(message);
        if (message.toUpperCase().includes("HELLO")) {
            this.actionProvider.handleHello();
        }
        if (message.toUpperCase().includes("FREE TRIAL")) {
            this.actionProvider.handleRegister();
        }
        if (message.toUpperCase().includes("PURCHASE")) {
            this.actionProvider.handleMembership();
        }
        if (message.toUpperCase().includes("PLANS")) {
            this.actionProvider.handlePlans();
        }
        if (message.toUpperCase().includes("SUBSCRIPTION")) {
            this.actionProvider.handleSubscription();
        }
        if (message.toUpperCase().includes("PAYMENT")) {
            this.actionProvider.handlePayment();
        }
        if (
            message.toUpperCase().includes("DATA") ||
            message.toUpperCase().includes("ANALYTICS")
        ) {
            this.actionProvider.handleAnalytics();
        }
        if (
            message.toUpperCase().includes("PRODUCT") ||
            message.toUpperCase().includes("BENEFIT")
        ) {
            this.actionProvider.handleBenefit();
        }
        if (message.toUpperCase().includes("ACCOUNT")) {
            this.actionProvider.handleAccount();
        }
        if (message.toUpperCase().includes("PASSWORD")) {
            this.actionProvider.handlePassword();
        }
    }
}

export default MessageParser;
