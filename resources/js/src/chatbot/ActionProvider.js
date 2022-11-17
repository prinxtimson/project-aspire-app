class ActionProvider {
    constructor(createChatbotMessage, setStateFunc, createClientMessage) {
        this.createChatbotMessage = createChatbotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
    }

    handleHello() {
        const message = this.createChatbotMessage("Hello. Nice to meet you.");
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));
    }

    handleRegister() {
        const message = this.createChatbotMessage(
            "Yes, users can have access to a 7days free trial before registering on the platform."
        );
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));
    }

    handleMembership() {
        const message = this.createChatbotMessage(
            "Membership for the Elint-X platform is available for purchase on elintx.herokuapp.com, Mytritek.co.uk and through selected retailers."
        );
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));
    }

    handlePlans() {
        const message = this.createChatbotMessage(
            "No, members will be prompted when their subscriptions are going to expire and give them the opportunity to renew, change or cancel their subscription."
        );
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));
    }

    handleSubscription() {
        const message = this.createChatbotMessage(
            "Yes, members can change their subscription plan at any point within their plan."
        );
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));
    }

    handlePayment() {
        const message = this.createChatbotMessage(
            "What payment options are available on the platform?"
        );
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));
    }

    handleAnalytics() {
        const message = this.createChatbotMessage(
            "You can get a variety of data analytics relating to Entertainment, Food, Health, and sports."
        );
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));
    }

    handleBenefit() {
        const message = this.createChatbotMessage(
            "Marketers, Businesses, Start-ups and Researchers stand to benefit a lot from this platform as it will help to improve decision making."
        );
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));
    }

    handleAccount() {
        const message = this.createChatbotMessage(
            "If no longer interested, you can delete your account by accessing the homepage>>> Account settings>>>delete account."
        );
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));
    }

    handlePassword() {
        const message = this.createChatbotMessage(
            "You can get a new password by simply clicking on the forgot password option on the home page."
        );
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));
    }
}

export default ActionProvider;
