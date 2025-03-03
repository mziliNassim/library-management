const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl my-5 mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-purple-800 mb-4 dark:text-purple-400">
        Privacy Policy
      </h1>

      <p className="text-gray-700 mb-4 dark:text-gray-300">
        Welcome to <strong>LibriTech</strong>. Your privacy is important to us.
        This Privacy Policy explains how we collect, use, and protect your
        information.
      </p>

      {/* 📋 Data Collection */}
      <h2 className="text-xl font-semibold text-purple-700 mt-4 mb-2 dark:text-purple-300">
        1. Information We Collect
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-300">
        <li>
          <strong>Personal Data:</strong> Name, email, phone number, and
          delivery address.
        </li>
        <li>
          <strong>Loan Data:</strong> Books borrowed, due dates, and penalties.
        </li>
        <li>
          <strong>Usage Data:</strong> Website activity, preferences, and
          interactions.
        </li>
      </ul>

      {/* 🔐 Data Usage */}
      <h2 className="text-xl font-semibold text-purple-700 mt-4 mb-2 dark:text-purple-300">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-300">
        <li>To process book loans and deliveries.</li>
        <li>To notify you about due dates, penalties, or service updates.</li>
        <li>To improve our services and user experience.</li>
        <li>To comply with legal requirements.</li>
      </ul>

      {/* 🔒 Data Security */}
      <h2 className="text-xl font-semibold text-purple-700 mt-4 mb-2 dark:text-purple-300">
        3. Data Security
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-300">
        <li>
          Your data is stored securely and protected against unauthorized
          access.
        </li>
        <li>
          We do not share your personal data with third parties unless required
          by law.
        </li>
      </ul>

      {/* ⚠️ User Rights */}
      <h2 className="text-xl font-semibold text-purple-700 mt-4 mb-2 dark:text-purple-300">
        4. Your Rights
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2 dark:text-gray-300">
        <li>
          You can request access, correction, or deletion of your personal data.
        </li>
        <li>You can opt out of promotional emails at any time.</li>
      </ul>

      <p className="text-gray-700 mt-4 dark:text-gray-300">
        By using <strong>LibriTech</strong>, you agree to this Privacy Policy.
        If you have any questions, contact our support team.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
