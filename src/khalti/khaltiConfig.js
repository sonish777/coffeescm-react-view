import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";

const getKhaltiCheckout = (
  productId,
  productName,
  productUrl,
  snackbarContext,
  responseHandler,
  donationMessage,
  onCloseKhaltiModal
) => {
  let config = {
    // replace this key with yours
    publicKey: "test_public_key_acd55fc32fe34760b158beb9afe44cba",
    //   productIdentity: "1234567890",
    //   productName: "Donation",
    //   productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      async onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        try {
          const response = await axios.post(
            "http://192.168.246.128:8000/api/consumer/donate",
            {
              ...payload,
              donationMessage,
            }
          );
          if (response.data.status === "success") {
            responseHandler(true, snackbarContext);
          }
        } catch (error) {
          responseHandler(false, snackbarContext);
          console.log("SOMETHING WENT WRONG");
          console.log(error.response.data);
        }
      },
      onError(error) {
        // handle errors
        console.log("INSIDE ERROR");
        console.log("ERROR IS", error);
      },
      onClose() {
        console.log("widget is closing");
        onCloseKhaltiModal();
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  return new KhaltiCheckout({
    ...config,
    productIdentity: productId,
    productName: productName,
    productUrl,
  });
};

export default getKhaltiCheckout;
