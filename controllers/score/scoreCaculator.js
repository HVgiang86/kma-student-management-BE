Caculator = {
    _10ScoreScaleCaculator: function (TP1, TP2, HK) {
        try {
            var score = 0;
            if (TP1 == null || TP2 == null || HK == null) {
                return null;
            }
            score = (TP1 * 0.7 + TP2 * 0.3) * 0.3 + HK * 0.7;

            var roundedScore = score.toFixed(2);

            var result = parseFloat(roundedScore);
            if (isNaN(result)) {
                return score;
            } else {
                return result;
            }
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    _4ScoreScaleCaculator: function (TP1, TP2, HK) {
        try {
            var _10ScaleScore = this._10ScoreScaleCaculator(TP1, TP2, HK);
            if (_10ScaleScore == null) {
                return null;
            }

            if (_10ScaleScore >= 9.0) {
                return 4.0;
            } else if (_10ScaleScore >= 8.5) {
                return 3.8;
            } else if (_10ScaleScore >= 7.8) {
                return 3.5;
            } else if (_10ScaleScore >= 7.0) {
                return 3.0;
            } else if (_10ScaleScore >= 6.3) {
                return 2.5;
            } else if (_10ScaleScore >= 5.5) {
                return 2.0;
            } else if (_10ScaleScore >= 4.8) {
                return 1.5;
            } else if (_10ScaleScore >= 4.0) {
                return 1.0;
            } else {
                return 0;
            }
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    },
    _letterScoreScaleCaculator: function (TP1, TP2, HK) {
        try {
            var _10ScaleScore = this._10ScoreScaleCaculator(TP1, TP2, HK);
            if (_10ScaleScore == null) {
                return null;
            }

            if (_10ScaleScore >= 9.0) {
                return "A+";
            } else if (_10ScaleScore >= 8.5) {
                return "A";
            } else if (_10ScaleScore >= 7.8) {
                return "B+";
            } else if (_10ScaleScore >= 7.0) {
                return "B";
            } else if (_10ScaleScore >= 6.3) {
                return "C+";
            } else if (_10ScaleScore >= 5.5) {
                return "C";
            } else if (_10ScaleScore >= 4.8) {
                return "D+";
            } else if (_10ScaleScore >= 4.0) {
                return "D";
            } else {
                return "F";
            }
        } catch (err) {
            console.log("An error occurred: " + err);
            throw new Error(err);
        }
    }
}

module.exports = Caculator;