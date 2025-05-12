import { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "LibriTech - Terms of Service";
  }, []);

  return (
    <div className="max-w-4xl my-5 mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-purple-800 mb-4 dark:text-purple-400">
        Terms of Service
      </h1>

      <p className="text-gray-700 mb-4 dark:text-gray-300">
        Welcome to <strong>LibriTech</strong>, your trusted book loan platform.
        By using our services, you agree to the following terms and conditions.
      </p>

      {/* 📚 Book Loans & Returns */}
      <h2 className="text-xl font-semibold text-purple-700 mt-4 mb-2 dark:text-purple-300">
        1. Book Loans & Return Policy
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-300">
        <li>
          Users can borrow books for a maximum period of{" "}
          <strong>1 month (30 days)</strong>.
        </li>
        <li>
          After the due date, users have a <strong>7-day grace period</strong>{" "}
          to return the book without penalties.
        </li>
        <li>Books must be returned in their original condition and on time.</li>
        <li>
          Failure to return a book after the grace period will result in{" "}
          <strong>penalties</strong>, including fines or borrowing restrictions.
        </li>
      </ul>

      {/* 💵 Payment Terms */}
      <h2 className="text-xl font-semibold text-purple-700 mt-4 mb-2 dark:text-purple-300">
        2. Payment Terms
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-300">
        <li>
          All payments are made via <strong>Cash on Delivery (COD)</strong> upon
          receiving the book.
        </li>
        <li>
          Failure to pay may result in <strong>account suspension</strong> until
          all dues are cleared.
        </li>
      </ul>

      {/* ⚠️ Late Returns & Penalties */}
      <h2 className="text-xl font-semibold text-purple-700 mt-4 mb-2 dark:text-purple-300">
        3. Late Returns & Penalties
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-300">
        <li>
          If a book is not returned after the{" "}
          <strong>7-day grace period</strong>, a{" "}
          <strong>late fee of $2 per day</strong> will be applied.
        </li>
        <li>
          If a book is not returned within{" "}
          <strong>30 days after the due date</strong>, it will be considered{" "}
          <strong>lost</strong>, and the user must pay the book’s full price.
        </li>
        <li>
          Users with <strong>unpaid fines</strong> will be restricted from
          borrowing more books.
        </li>
      </ul>

      {/* 📖 Book Condition & Damages */}
      <h2 className="text-xl font-semibold text-purple-700 mt-4 mb-2 dark:text-purple-300">
        4. Book Condition & Damage Fees
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-300">
        <li>
          Books must be returned in <strong>good condition</strong>.
        </li>
        <li>
          Minor damages (e.g., torn pages, marks) will result in a{" "}
          <strong>repair fee</strong>.
        </li>
        <li>
          Severe damage or loss of a book requires the{" "}
          <strong>full book replacement cost</strong>.
        </li>
      </ul>

      {/* 🚫 User Responsibilities & Account Bans */}
      <h2 className="text-xl font-semibold text-purple-700 mt-4 mb-2 dark:text-purple-300">
        5. User Responsibilities
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-300">
        <li>
          Users must provide{" "}
          <strong>accurate contact and address details</strong>.
        </li>
        <li>
          Repeated late returns or unpaid penalties may result in a{" "}
          <strong>temporary or permanent account ban</strong>.
        </li>
        <li>
          Accounts found to be abusing the system (e.g., not returning books,
          creating fake accounts) will be <strong>banned indefinitely</strong>.
        </li>
      </ul>

      {/* 🔄 Platform Rights */}
      <h2 className="text-xl font-semibold text-purple-700 mt-4 mb-2 dark:text-purple-300">
        6. Service Limitations
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-300">
        <li>
          LibriTech reserves the right to{" "}
          <strong>change loan durations, fees, or policies</strong> at any time.
        </li>
        <li>
          Service availability depends on{" "}
          <strong>book stock and delivery locations</strong>.
        </li>
      </ul>

      <p className="text-gray-700 mt-4 dark:text-gray-300">
        By using <strong>LibriTech</strong>, you agree to these terms. Happy
        reading!
      </p>
    </div>
  );
};

export default TermsOfService;
