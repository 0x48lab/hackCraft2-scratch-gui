HACKCRAFT_HOME=../../..
SCRATCH_HOME=$HACKCRAFT_HOME/www/public/scratch

rm -rf $SCRATCH_HOME/*
cp -r build/* $SCRATCH_HOME
