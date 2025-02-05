<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');


// Define the dateToWords function
function dateToWords($date) {
    $date_arr = explode('-', $date);
    $day = $date_arr[0];
    $month = $date_arr[1];
    $year = $date_arr[2];

    // Months in words
    $months = array(
        '01' => 'January', '02' => 'February', '03' => 'March', '04' => 'April',
        '05' => 'May', '06' => 'June', '07' => 'July', '08' => 'August',
        '09' => 'September', '10' => 'October', '11' => 'November', '12' => 'December'
    );

    // Convert day and year to words
    $day_words = convertToWords($day);
    $year_words = convertYearToWords($year);

    // Month in words
    $month_word = $months[$month];

    $dob_words = ucfirst($day_words) . ' ' . $month_word . ' ' . $year_words;
    return $dob_words;
}

// Define the convertToWords function
function convertToWords($number) {
    $ones = array(
        1 => 'one', 2 => 'two', 3 => 'three', 4 => 'four', 5 => 'five', 6 => 'six',
        7 => 'seven', 8 => 'eight', 9 => 'nine', 10 => 'ten', 11 => 'eleven', 12 => 'twelve',
        13 => 'thirteen', 14 => 'fourteen', 15 => 'fifteen', 16 => 'sixteen', 17 => 'seventeen',
        18 => 'eighteen', 19 => 'nineteen'
    );

    $tens = array(
        2 => 'twenty', 3 => 'thirty', 4 => 'forty', 5 => 'fifty', 6 => 'sixty',
        7 => 'seventy', 8 => 'eighty', 9 => 'ninety'
    );

    $hundreds = array(
        1 => 'one hundred', 2 => 'two hundred', 3 => 'three hundred', 4 => 'four hundred', 5 => 'five hundred',
        6 => 'six hundred', 7 => 'seven hundred', 8 => 'eight hundred', 9 => 'nine hundred'
    );

    $result = '';

    if ($number >= 100) {
        $result .= $hundreds[substr($number, 0, 1)] . ' ';
        $number = substr($number, 1);
    }

    if ($number >= 20) {
        $result .= $tens[substr($number, 0, 1)] . ' ';
        $number = substr($number, 1);
    }

    if ($number >= 1) {
        $result .= $ones[$number];
    }

    return $result;
}

// Define the convertYearToWords function
function convertYearToWords($year) {
    $year_words = '';
    $thousands = intval($year / 1000);
    $hundreds = intval(($year % 1000) / 100);
    $tens = intval(($year % 100) / 10);
    $ones = intval($year % 10);

    if ($thousands > 0) {
        $year_words .= convertToWords($thousands) . ' thousand ';
    }

    if ($hundreds > 0) {
        $year_words .= convertToWords($hundreds) . ' hundred ';
    }

    if ($tens > 0 || $ones > 0) {
        $year_words .= convertToWords($tens * 10 + $ones);
    }

    return $year_words;
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $formData = $_POST['formData'] ?? '';

    $data = json_decode($formData, true);

// Sanitize and collect form data from $data array
$upazila = htmlspecialchars($data['upazilaOrCity']);
$regOff = htmlspecialchars($data['registerOfficeAddress']);
$name = htmlspecialchars($data['nameInBangla']);
$nameEn = htmlspecialchars($data['nameInEnglish']);
$fatherName = htmlspecialchars($data['fatherNameInBangla']);
$fatherNameEn = htmlspecialchars($data['fatherNameInEnglish']);
$fatherNational = htmlspecialchars($data['fatherNationalityBangla']);
$fatherNationalEn = htmlspecialchars($data['fatherNationality']);
$motherName = htmlspecialchars($data['motherNameInBangla']);
$motherNameEn = htmlspecialchars($data['motherNameInEnglish']);
$motherNational = htmlspecialchars($data['motherNationalityBangla']);
$motherNationalEn = htmlspecialchars($data['motherNationality']);
$birthPlace = htmlspecialchars($data['placeOfBirthInBangla']);
$birthPlaceEn = htmlspecialchars($data['placeOfBirthInEnglish']);
$verify = htmlspecialchars($data['leftBarcode']);
$sex = htmlspecialchars($data['gender']);
$dob = htmlspecialchars($data['dateOfBirth']);
$permanentAddr = htmlspecialchars($data['permanentAddressInBangla']);
$permanentAddrEn = htmlspecialchars($data['permanentAddressInEnglish']);
$birthNo = htmlspecialchars($data['birthRegistrationNumber']);
$issueDate1 = htmlspecialchars($data['dateOfIssuance']);
$regDate1 = htmlspecialchars($data['dateOfRegistration']);
$wxdob = htmlspecialchars($data['dateOfBirthInWords']);

// Convert dates to required formats
$dob2 = date('d-m-Y', strtotime($dob));
$dobParts = explode('-', $dob2);
$day = ltrim($dobParts[0], '0');
$wdob = $day . '-' . $dobParts[1] . '-' . $dobParts[2];

$issueDate = date('d/m/Y', strtotime($issueDate1));
$regDate = date('d/m/Y', strtotime($regDate1));
$dob1 = date('d/m/Y', strtotime($dob));

$dob_words = dateToWords($wdob);

    // $data = json_decode($formData, true);


    // // Sanitize and collect form data
    // $upazila = htmlspecialchars($_POST['upazila']);
    // $regOff = htmlspecialchars($_POST['regOff']);
    // $name = htmlspecialchars($_POST['name']);
    // $nameEn = htmlspecialchars($_POST['nameEn']);
    // $fatherName = htmlspecialchars($_POST['fatherName']);
    // $fatherNameEn = htmlspecialchars($_POST['fatherNameEn']);
    // $fatherNational = htmlspecialchars($_POST['fatherNational']);
    // $fatherNationalEn = htmlspecialchars($_POST['fatherNationalEn']);
    // $motherName = htmlspecialchars($_POST['motherName']);
    // $motherNameEn = htmlspecialchars($_POST['motherNameEn']);
    // $motherNational = htmlspecialchars($_POST['motherNational']);
    // $motherNationalEn = htmlspecialchars($_POST['motherNationalEn']);
    // $birthPlace = htmlspecialchars($_POST['birthPlace']);
    // $birthPlaceEn = htmlspecialchars($_POST['birthPlaceEn']);
    // $verify = htmlspecialchars($_POST['verify']);
    // $sex = htmlspecialchars($_POST['sex']);
    // $sexEn = htmlspecialchars($_POST['sexEn']);
    // $dob = htmlspecialchars($_POST['dob']);
    // $permanentAddr = htmlspecialchars($_POST['permanentAddr']);
    // $permanentAddrEn = htmlspecialchars($_POST['permanentAddrEn']);
    // $birthNo = htmlspecialchars($_POST['birthNo']);
    // $issueDate1 = htmlspecialchars($_POST['issuteDate']);
    // $regDate1 = htmlspecialchars($_POST['regDate']);
    // $dob2 = date('d-m-Y', strtotime($dob));
    // $wxdob = htmlspecialchars($_POST['wdob']);
    // // Explode the DOB string to get day, month, and year parts
    // $dobParts = explode('-', $dob2);
    // // Remove leading zero from day part if present
    // $day = ltrim($dobParts[0], '0');
    // // Reformat DOB string
    // $wdob = $day . '-' . $dobParts[1] . '-' . $dobParts[2];

	// $issueDate = date('d/m/Y', strtotime($issueDate1));
	// $regDate = date('d/m/Y', strtotime($regDate1));
    // $dob1 = date('d/m/Y', strtotime($dob));

    // $dob_words = dateToWords($wdob);
} else {
    echo "Please submit the form.";
    exit;
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        });
    </script>
    <title></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.0/css/bootstrap.min.css" integrity="sha512-NZ19NrT58XPK5sXqXnnvtf9T5kLXSzGQlVZL9taZWeTBtXoN3xIfTdxbkQh6QSoJfJgpojRqMfhyqBAAEeiXcA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="birth1.css">
    <link rel="stylesheet" href="birth2.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=REM:wght@100;200;300;400;500;600;700;800;900&family=Roboto+Slab&display=swap" rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=REM:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@100;300;400;500&display=swap" rel="stylesheet">
    <style>
        /* print.css */
        @page {
            margin: 0; /* Set the margin to none */
            size: A4;  /* Set the page size to A4 */
        }
    </style>
</head>

<body>
    <div class="a4_page" id="a4_page">
        <div class="main_wrapper">
            <img src="ri_1.png" class="main_logo" alt="">
            <span style="z-index: 10;">
                <div class="mr_header">
                    <div class="left_part_hidden"></div>
                    <div class="left_part">
                                                <img style="height:110px; width:110px;" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://bdris.gov.bd/certificate/verify?key=9129hNa05dUx6cP5h5S4yZmhnXeei7Sz219AXSsFfCIvmM4uS64mfo6fIFiyyIo1" alt="">
                        <h2><?php echo $verify; ?></h2>
                    </div>
                    <div class="middle_part">
                        <img src="bd_logo.png" alt="" class="main_logo_r">
                        <img src="bd_logo.png" alt="" style="opacity: 0;">
                        <h2>Government of the People’s Republic of Bangladesh</h2>
                        <p class="office">Office of the Registrar, Birth and Death Registration</p>
                        <p class="address2"><?php echo $regOff; ?></p>
                        <p class="address1"><?php echo $upazila; ?></p>
                        <p class="rule_y">(Rule 9, 10)</p>
                        <h1><span class="bn">জন্ম নিবন্ধন সনদ /</span> <span class="en" style="font-family: 'Roboto Slab', serif;">Birth Registration Certificate</span></h1>
                    </div>
                    <div class="right_part_hidden"></div>
                    <div class="right_part">
                        <canvas style="height: 26px; width:220px;" id="barcode"></canvas>
                    </div>
                </div>

                <div class="mr_body">
                    <div class="top_part1">
                        <div class="left">
                            <p>Date of Registration</p>
                            <p><?php echo $regDate; ?></p>
                        </div>
                        <div class="middle">
                            <h2>Birth Registration Number</h2>
                            <h1 style="font-weight:500 !important;"><?php echo $birthNo; ?></h1>
                        </div>
                        <div class="right">
                            <p>Date of Issuance</p>
                            <p><?php echo $issueDate; ?></p>
                        </div>
                    </div>


                    <div class="middle">


                        <div style="margin-top: 2px;margin-bottom: 5px;" class="new_td_2">
                            <div class="left">
                                <div class="part1">
                                    <p class="bn">Date of Birth<span style="margin-left: 39px;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span  class="bn"><?php echo $dob1; ?></span></p>
                                </div>
                            </div>
                            <div class="right">
                                <div class="part1">
                                    <p><span style="margin-left: 95px;" class="clone">Sex :</span></p>
                                </div>
                                <div class="part2">
                                    <p><span><?php echo $sex; ?></span></p>
                                </div>
                            </div>
                        </div>


                        <div style="margin-top: 5px;margin-bottom: 24px !important;" class="td">
                            <div class="left">
                                <div style="width: 127px;" class="part1">
                                    <p>In Word <span >:</span></p>
                                </div>
                                <div class="part2" style="width: 400px;">

                                    <p><span style="margin-left:5px"> <?php echo $wxdob; ?>  </span></p>
                                </div>
                            </div>
                        </div>

                        <div style="margin-top: 7px; margin-bottom:15px;" class="new_td">
                            <div class="left">
                                <div class="part1">
                                    <p class="bn">নাম<span style="margin-left: 103px;" class="clone">:</span></p>
                                </div>
                                <div class="part2" id="name_data_bn">
                                    <p><span  class="bn"><?php echo $name; ?></span></p>
                                </div>
                            </div>
                            <div class="right">
                                <div class="part1">
                                    <p style="font-weight:500">Name<span style="margin-left: 94px;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span style="font-weight:500"><?php echo $nameEn; ?></span></p>
                                </div>
                            </div>
                        </div>

                        <div id="mother_content" style="margin-top: 17px;margin-bottom: 15px;" class="new_td">
                            <div class="left">
                                <div class="part1">
                                    <p class="bn">মাতা<span style="margin-left: 98px;" class="clone">:</span></p>
                                </div>
                                <div class="part2" id="motherName_data_bn">
                                    <p><span class="bn"><?php echo $motherName; ?></span></p>
                                </div>
                            </div>
                            <div class="right">
                                <div class="part1">
                                    <p style="font-weight:500;">Mother<span style="margin-left: 87px;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span style="font-weight:500;text-transform:capitalize;"><?php echo $motherNameEn; ?></span></p>
                                </div>
                            </div>
                        </div>

                        <div id="motherNanality_content" style="margin-top: 17px;" class="new_td">
                            <div class="left">
                                <div class="part1">
                                    <p class="bn">মাতার জাতীয়তা<span style="margin-left: 40px;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span class="bn"><?php echo $motherNational; ?></span></p>
                                </div>
                            </div>
                            <div class="right">
                                <div class="part1">
                                    <p style="font-weight:500">Nationality<span style="margin-left: 64px;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span style="font-weight:500"><?php echo $motherNationalEn; ?></span></p>
                                </div>
                            </div>
                        </div>

                        <div style="margin-top: 16px;" class="new_td">
                            <div class="left">
                                <div class="part1">
                                    <p class="bn">পিতা<span style="margin-left: 99px;" class="clone">:</span></p>
                                </div>
                                <div class="part2" id="fatherName_data_bn">
                                    <p><span class="bn"><?php echo $fatherName; ?></span></p>
                                </div>
                            </div>
                            <div class="right">
                                <div class="part1">
                                    <p style="font-weight:500">Father<span style="margin-left: 91px;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span style="font-weight:500;text-transform:capitalize;"><?php echo $fatherNameEn; ?></span></p>
                                </div>
                            </div>
                        </div>

                        <div id="fatherNanality_content" style="margin-top: 17px;" class="new_td">
                            <div class="left">
                                <div class="part1">
                                    <p class="bn">পিতার জাতীয়তা<span style="margin-left: 40px;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span class="bn"><?php echo $fatherNational; ?></span></p>
                                </div>
                            </div>
                            <div class="right">
                                <div class="part1">
                                    <p style="font-weight:500">Nationality<span style="margin-left: 65px;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span style="font-weight:500"><?php echo $fatherNationalEn; ?></span></p>
                                </div>
                            </div>
                        </div>

                        <div style="margin-top: 17px;" class="new_td">
                            <div class="left">
                                <div class="part1">
                                    <p class="bn">জন্মস্থান<span style="margin-left: 86px;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span class="bn"><?php echo $birthPlace; ?></span></p>
                                </div>
                            </div>
                            <div class="right">
                                <div class="part1">
                                    <p style="width: 153px; font-weight:500">Place of Birth<span style="margin-left: 46px;margin-right: 0;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span style="font-weight:500;text-transform:capitalize;"><?php echo $birthPlaceEn; ?></span></p>
                                </div>
                            </div>
                        </div>

                        <div style="margin-top: 30px;" class="new_td">
                            <div class="left">
                                <div class="part1">
                                    <p style="width: 146px;" class="bn">স্থায়ী ঠিকানা<span style="margin-left:64px;margin-right: 0;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span class="bn"><?php echo $permanentAddr; ?></span></p>
                                </div>
                            </div>
                            <div class="right">
                                <div class="part1">
                                    <p style="display:flex; width:154px; font-weight:500">Permanent<br>Address<span style="margin-left: 63px;" class="clone">:</span></p>
                                </div>
                                <div class="part2">
                                    <p><span style="font-weight:500"><?php echo $permanentAddrEn; ?></span></p>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </span>

            <div class="mr_footer">
                <div class="top">
                <div class="left">
                        <h2 style="width:10rem; margin-top: 0px;">Seal & Signature</h2>
                        <p style="margin-top: 0px;">Assistant to Registrar</p>
                        <p style="margin-top: 0px;">(Preparation, Verification)</p>
                    </div>
                    <div class="right">
                      <h2 style="width:10rem" >Seal & Signature<h2>
                        <p>Registrar</p>
                    </div>
                </div>
                <div style="margin-top:8rem"class="bottom">
                    <p>This certificate is generated from bdris.gov.bd, and to verify this certificate, please scan the above QR Code & Bar Code.</p>
                </div>
            </div>
        </div>
    </div>



<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
    <script>
        let dob_n = "<?php echo $birthNo; ?>";
        JsBarcode("#barcode", dob_n, {
            format: "CODE128",
            displayValue: false,
        });
    </script>
    <script>
  // Function to generate and download the PDF
  function generatePDF() {
    const pdf = new jsPDF();

    // Add content to the PDF (you can customize this part)
    pdf.text(20, 20, 'Hello, this is your PDF content.');

    // Save the PDF with a specific name, e.g., "certificate.pdf"
    pdf.save('certificate.pdf');
  }

  // Attach an event listener to the button
  document.getElementById('downloadPDF').addEventListener('click', generatePDF);
</script>


    <script>
       document.title = "<?php echo htmlspecialchars($data['birthRegistrationNumber'], ENT_QUOTES, 'UTF-8'); ?>";

       window.addEventListener('click', function(){
            window.print();
        });

        $(document).ready(function() {
            var elementWidth = $('#name_data_bn').height();
            if(Number(Math.floor(elementWidth)) > 23){
                $('#mother_content').css("margin-top", "0px");
            }

            var elementWidth = $('#motherName_data_bn').height();
            if(Number(Math.floor(elementWidth)) > 23){
                $('#motherNanality_content').css("margin-top", "0px");
            }

            var elementWidth = $('#fatherName_data_bn').height();
            if(Number(Math.floor(elementWidth)) > 23){
                $('#fatherNanality_content').css("margin-top", "16px");
            }
        });
    </script>


</body>
</html>
