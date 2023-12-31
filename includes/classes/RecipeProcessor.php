<?php



        class RecipeProcessor {
            private $con;
            // private $sizeLimit = 500000000;
            private $allowedTypes = ['jpg', 'jpeg', 'png', 'webp'];
            public $errors = array();

            public function __construct($con){
                $this->con = $con;

            }

            public function upload($recipeUploadData){
                $recipeData = $recipeUploadData->recipeDataArray;
                $fileName = uniqid() . basename($recipeData["name"]) ;
                $fileName = str_replace(" ", "_",$fileName);
                $targetDir = "../uploads/recipeImgs/".$fileName;
                ///uniqid()  is built in function of php to create unique characters
                ///basename() is built in function of php to get filename
                //"uploads/videos/83c3hkifgh9H_Filename.mp4

                $isValidData = $this->processData($recipeData, $fileName);

                if(!$isValidData){
                    return false;
                }
                

                ///move_uploaded_file() built in PHP function
                if(move_uploaded_file($recipeData['tmp_name'], $targetDir)){
                    $this->addErrs('file moved successfully');
           
                    if($this->insertRecipeData($recipeUploadData, $fileName)){       
                        return true;
                    }
                    else if(!$this->insertRecipeData($recipeUploadData, $fileName)){
                        $this->addErrs('Insert query failed');
                        return false;
                    }

                    // return true;

                }



            }

            private function processData($recipeData, $filePath){
                $imgType = pathInfo($filePath, PATHINFO_EXTENSION);

                 if(!$this->isValidType($imgType)){
                    $this->addErrs('Invalid file type');
                    return false;
                } else if ($this->hasError($recipeData)){
                    $this->addErrs("Error code: ".$recipeData['error']);
                    return false;
                }

                return true;
            }

       
            private function isValidType($type){
                $lowercased = strtolower($type);
                return in_array($lowercased, $this->allowedTypes);
            }
            private function hasError($data){
                return $data['error'] != 0;
            }
            private function insertRecipeData($uploadData, $filePath){
                $query = "INSERT INTO ".TBL_RECIPES."(title, uploadedBy, ingredients, privacy, category, howtocook, description, filePath)
                VALUES('$uploadData->title', '$uploadData->uploadedBy', '$uploadData->ingredients', '$uploadData->privacy', '$uploadData->category', '$uploadData->howtocook', '$uploadData->description', '$filePath')";

                return $this->con->query($query);
            }

            private function addErrs($data){
                array_push($this->errors, $data);
            }

            public function getErrors(){
                return $this->errors;
            }




            
        }

?>