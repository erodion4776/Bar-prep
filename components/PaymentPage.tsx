


import React, { useState } from 'react';
import { useAuth } from '../App';
import { Button } from './student/common/Button';
import { Card } from './student/common/Card';

const PaymentPage: React.FC = () => {
    const { planForPurchase, completePurchase, showPlanSelection } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            completePurchase();
            setIsProcessing(false);
        }, 1500);
    };

    if (!planForPurchase) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold">No plan selected</h2>
                <p className="mt-2">Please go back and select a plan to continue.</p>
                <Button onClick={showPlanSelection} className="mt-4">Back to Plans</Button>
            </div>
        );
    }
    
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="max-w-lg w-full">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center text-on-surface">Complete Your Registration</h2>
                    <p className="text-center text-on-surface-secondary mt-2">You're about to enroll in the best bar prep mentorship program.</p>
                    
                    <div className="mt-8 p-6 bg-background rounded-lg border border-on-surface/10">
                        <h3 className="font-bold text-lg text-primary">{planForPurchase.name}</h3>
                        <p className="mt-2 text-on-surface-secondary">{planForPurchase.description}</p>
                        <div className="mt-4 pt-4 border-t border-on-surface/10 flex justify-between items-baseline">
                            <span className="font-semibold text-on-surface-secondary">Total Price</span>
                            <span className="text-3xl font-extrabold text-on-surface">${planForPurchase.price}</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="font-bold text-lg text-on-surface">Payment Information</h3>
                        <form className="mt-4 space-y-4">
                             <div>
                                <label htmlFor="cardName" className="block text-sm font-medium text-on-surface-secondary">Cardholder Name</label>
                                <input type="text" id="cardName" className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Cynthia Azor" />
                            </div>
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-on-surface-secondary">Card Number</label>
                                <input type="text" id="cardNumber" className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="**** **** **** 1234" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="expiryDate" className="block text-sm font-medium text-on-surface-secondary">Expiry Date</label>
                                    <input type="text" id="expiryDate" className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="MM / YY" />
                                </div>
                                <div>
                                    <label htmlFor="cvc" className="block text-sm font-medium text-on-surface-secondary">CVC</label>
                                    <input type="text" id="cvc" className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="123" />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 flex flex-col items-center space-y-4">
                         <Button onClick={handlePayment} className="w-full text-lg" disabled={isProcessing}>
                            {isProcessing ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background-contrast" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </div>
                            ) : `Pay $${planForPurchase.price} Now`}
                        </Button>
                        <Button onClick={showPlanSelection} variant="secondary" className="text-sm" disabled={isProcessing}>
                            Go Back
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default PaymentPage;
