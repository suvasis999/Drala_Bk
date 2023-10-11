import React, { useState, useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Dialog } from "@headlessui/react";
import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";
import Modal from "./Modal";
import Toastr from "./Toastr";



const PaypalButtonWrapper = () => 
{ 
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [orderId, setOrderId] = useState("");
  const [modalText, setModalText] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Success");

  const generateOrder = async (id , currency) => {
    const response = await axios.post(`/order/paypal/${id}`, {
      currency,
    });
    return response.data.id;
  };
  
  const recievePayment = async (orderId, paymentId ) => {
    const response = await axios.post(`/payment/paypal`, {
      orderId,
      paymentId,
    });
    return response.data;
  };


  const initialOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: 'USD',
  };

  const closeModals = () => {
    setModalOpen(false);
  };

  const closeModalsAndRedirect = () => {
    window.location.href = "/";
  };

  return (
    <div className="relative z-0 flex-1">
      <Modal
        open={modalOpen}
        handlers={closeModals}
        modalTitle="Payment Status"
        modalDescription=""
      >
        <div>
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
            {paymentStatus === "Success" ? (
              <CheckIcon
                className="w-6 h-6 text-green-600"
                aria-hidden="true"
              />
            ) : (
              <ExclamationIcon
                className="w-6 h-6 text-green-600"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {modalText}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Order ID : {orderId}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={closeModalsAndRedirect}
          >
            Go back to dashboard
          </button>
        </div>
      </Modal>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={async (data, actions) => {
            try {
              const orderId = await generateOrder(Id, currency);
              setOrderId(orderId);
              return orderId;
            } catch {
              Toastr.error("Error Creating Paypal Order");
              return "";
            }
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(async (details) => {
              // This function shows a transaction success message to your buyer.
              let messageFromServer = "";
              if (details?.purchase_units?.[0]?.payments?.captures) {
                try {
                  const resFromServer = await recievePayment(
                    details.id,
                    details.purchase_units[0].payments["captures"][0]
                      .id as string
                  );
                  // @ts-ignore
                  messageFromServer = resFromServer.message;
                  // Make Calls to backend to changes in react state corresponding to successful payment here
                  setPaymentStatus("Success");
                  setModalText("Payment successful.");
                  setModalOpen(true);
                } catch {
                  Toastr.error(
                    "Error enrolling student, please contact tech@xyz.com"
                  );
                }
              } else {
                setPaymentStatus("Fail");
                setModalText(
                  "Payment failed. Please contact tech@xyz.com if money is deducted!"
                );
                setModalOpen(true);
              }
            });
          }}
          onError={(err) => {
            setPaymentStatus("Fail");
            setModalText(
              "Payment failed from Paypal's end! Please try again after sometime."
            );
            setModalOpen(true);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );

  
};

export default PaypalButtonWrapper;