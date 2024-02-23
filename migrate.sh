for a in `find ./src`; do 
  if [ -d $a ]; then 
    export b=`echo $a | sed "s/src/dest/"`
    echo "From: $a to $b"
    npx gulp migrate --input $a --output $b 
  fi; 
done;
