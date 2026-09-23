#!/bin/bash
set -e
mkdir -p public/Archive_Certificates_Images

generate() {
  local pdf="$1"
  local base="$2"
  echo "Generating $base from $pdf..."
  pdftoppm -png -r 120 -f 1 -l 1 "public/Certificates/$pdf" "public/Archive_Certificates_Images/$base"
  mv "public/Archive_Certificates_Images/${base}-1.png" "public/Archive_Certificates_Images/${base}.png"
}

generate "SkillsCert20251025-31-g5iq5d.pdf" "mongodb_vector"
generate "Dickson-Nvdia-certificate.pdf" "nvidia_jetson"
generate "Dickson-MongoDB-Certificate.pdf" "mongodb_python"
generate "certificate_Full Stack Web development MERN Stack_1634237.pdf" "prepinsta_mern"
generate "DicksonE-EVEN 23-24 FIRST-certificate.pdf" "python_pcap"
generate "badge304103317893189197329728229.pdf" "uipath_automation"
generate "Dickson-PromptEngineer-Certificate.pdf" "ibm_prompt"
generate "Dickson-Data-Analysis-withpython.pdf" "ibm_data_analysis"
generate "Dickson-PowerBI-Certificate.pdf" "infosys_powerbi"
generate "Dickson-Tableau_Cetificate.pdf" "infosys_tableau"
generate "Dickson-Ethics-Certificate.pdf" "coursera_ethics"
generate "Dickson machine learning certificate infosys.pdf" "infosys_ml"
generate "8f83ac2a-77ab-4592-831d-dd62926d696c.pdf" "aws_compute"
generate "Dickson Dynamo db nosql certificate.pdf" "infosys_dynamodb"

echo "All 14 thumbnails generated successfully!"
ls -la public/Archive_Certificates_Images/
