const BirthCertificate = () => {
  return (
    <div className="w-full bg-[#525659]">
      <div className="relative max-w-4xl p-8 mx-auto text-black bg-white">
        <div
          className="w-[600px] h-[600px] absolute opacity-50 left-1/2 top-[35%] -translate-x-1/2 bg-center bg-cover"
          style={{
            backgroundImage: `url('/birth.png')`,
          }}
        ></div>
        <div className="relative z-20 flex items-start justify-between">
          <div className="w-32 h-32 border border-gray-400" />
          <div className="flex-1 px-4 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-2 rounded-full">
              <img src="/bd_logo.png" alt="" className="w-full h-full" />
            </div>
            <h1 className="text-xl font-semibold">
              Government of the People's Republic of Bangladesh
            </h1>
            <p className="text-sm">
              Office of the Registrar, Birth and Death Registration
            </p>
            <p className="text-sm">Harirampur Union Parishad</p>
            <p className="mb-0 text-sm">Gobindaganj, Gaibandha</p>
            <p className="text-sm">(Rule 9, 10)</p>
          </div>
          <div className="w-48 h-12 border border-gray-400" />
        </div>
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold">
            জন্ম নিবন্ধন সনদ / Birth Registration Certificate
          </h2>
        </div>
        <div className="flex justify-between mb-4">
          <div>
            <span>Date of Registration</span>
            <span className="ml-2">06/01/2025</span>
          </div>
          <div className="mb-6 text-center">
            <div className="text-xl font-semibold">
              Birth Registration Number
            </div>
            <div className="text-2xl font-bold">20043213022121410</div>
          </div>
          <div>
            <span>Date of Issuance</span>
            <span className="ml-2">06/01/2025</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span>Date of Birth</span>
              <span className="ml-2">: 20/01/2004</span>
            </div>
            <div>
              <span>Sex</span>
              <span className="ml-2">: Male</span>
            </div>
          </div>
          <div>
            <span>In Word</span>
            <span className="ml-2">
              : Twentieth of January Two Thousand Four
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span>নাম</span>
              <span className="ml-2">: মোঃ রুমান হোসেন</span>
            </div>
            <div>
              <span>Name</span>
              <span className="ml-2">: Md Ruman Hossain</span>
            </div>
            <div>
              <span>মাতা</span>
              <span className="ml-2">: মোছাঃ নিলি বেগম</span>
            </div>
            <div>
              <span>Mother</span>
              <span className="ml-2">: Mst Nili Begum</span>
            </div>
            <div>
              <span>মাতার জাতীয়তা</span>
              <span className="ml-2">: বাংলাদেশী</span>
            </div>
            <div>
              <span>Nationality</span>
              <span className="ml-2">: Bangladeshi</span>
            </div>
            <div>
              <span>পিতা</span>
              <span className="ml-2">: মোঃ রাহাদ হোসেন</span>
            </div>
            <div>
              <span>Father</span>
              <span className="ml-2">: Md Rahad Hossain</span>
            </div>
            <div>
              <span>পিতার জাতীয়তা</span>
              <span className="ml-2">: বাংলাদেশী</span>
            </div>
            <div>
              <span>Nationality</span>
              <span className="ml-2">: Bangladeshi</span>
            </div>
            <div>
              <span>জন্মস্থান</span>
              <span className="ml-2">: কুষ্টিয়া, বাংলাদেশ</span>
            </div>
            <div>
              <span>Place of Birth</span>
              <span className="ml-2">: Kushtia, Bangladesh</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span>স্থায়ী ঠিকানা</span>
              <span className="ml-2">
                : রামচন্দ্রপুর হরিরামপুর, ওয়ার্ড - ৫, হরিরামপুর, গোবিন্দগঞ্জ,
                গাইবান্ধা
              </span>
            </div>
            <div>
              <span>Permanent Address</span>
              <span className="ml-2">
                : Ramchandropur Horirampur, Ward - 5, Harirampur, Gobindaganj,
                Gaibandha
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-16">
          <div className="text-center">
            <div className="w-48 pt-2 border-t border-black">
              <p>Seal &amp; Signature</p>
              <p className="text-sm">Assistant to Registrar</p>
              <p className="text-sm">(Preparation, Verification)</p>
            </div>
          </div>
          <div className="text-center">
            <div className="w-48 pt-2 border-t border-black">
              <p>Seal &amp; Signature</p>
              <p className="text-sm">Registrar</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-xs text-center">
          This certificate is generated from bdris.gov.bd, and to verify this
          certificate, please scan the above QR Code &amp; Bar Code.
        </div>
      </div>
    </div>
  );
};

export default BirthCertificate;
