COMPID1=$1
COMPID2=$3
TEAM1=$2
TEAM2=$4
for x in `ls ${COMPID1}/*${TEAM1}*Bugs.txt`
do
	echo $x
	cat $x
done
echo
for x in `ls ${COMPID2}/*${TEAM2}*Bugs.txt`
do
	echo $x
	cat $x
done
