/**
 * ECMAScript
 * testing the Date object
 *
 * 13.07.2001, torstein@opera.com
 */

var cvs = "$Id: dateObjectTest.js 111953 2012-03-08 09:05:47Z svn $";

function getTimezone(d4)
{
    function pad( h, m ) {
	return String(100 + h).substring(1,3) + String(100 + m).substring(1,3);
    }

    var tzo = d4.getTimezoneOffset();
    var sign = tzo >= 0 ? "-" : "+";
    tzo = Math.abs(tzo);
    return "GMT" + sign + pad( Math.floor(tzo/60), tzo%60 );
}

function getGMTOffset()
{
    return (new Date()).getTimezoneOffset() / 60;
}

function main( windowObject )
{
    try {
	testmodule( 'Date object test', cvs );
	expect(236);//number of tests - update this when tests are added!
	testcase( 'Date object constructor' );
	testDateConstructor( windowObject );

	testcase( 'Date object properties' );
	testDateProperties( windowObject );

	testcase( 'Date object methods' );
	testDateGetMethods( windowObject );
	testDateSetMethods( windowObject );
	testOtherDateMethods( windowObject );
	testDateStaticMethods( windowObject );

	testmodule_finished();

    }
    catch( e )
    {
	exception( e );
    }
}

function testDateConstructor( windowObject )
{
    try
    {
	var d, d1, d2, d3, d4, d5, d6, d7;

	d1 = Date();
	d2 = new Date();

	test( "Date() called as a function ", typeof d1, "string" );  // Date() == (new Date()).toString()
	test( "Date() called as a constructor  ", typeof d2, "object" );

	/*** Testing calling constructor with one argument, milliseconds ***/
	d = new Date( d2.getTime() );
	test( 'typeof, when constructor = Date( milliseconds )', typeof d, 'object' );
	test( 'getTime(), when constructor = Date( milliseconds )', d.getTime(), d2.getTime() );

	/*** Testing calling constructor with one argument, datestring ***/
	var datestring = d2.toString();
	//      datestring = datestring.replace( /\(CET\)/i, '' );
	d3 = new Date( datestring );

	test( 'typeof, when constructor = Date( datestring )', typeof d3, 'object' );
	test( 'getTime(), when constructor = Date( datestring )', d3.toString(), d2.toString() );

	/*** Testing calling constructor with three arguments, year month and day number  ***/
	d4 = new Date( 2001, 07, 17 );
	test( 'typeof, when constructor = Date( year, month, day )', typeof d4, 'object' );
	test( 'contents of object after d = new Date( 2001, 07, 17 )', d4.getFullYear() + '' + d4.getMonth() + '' + d4.getDate(), '2001717' );

	/*** Testing calling constructor with seven arguments, year month day hour minute and second number  ( JS < 1.3 has only 6 args ) ***/
	d5 = new Date( 2001, 07, 17, 14, 13, 01, 02 );
	test( 'typeof, when constructor = Date( year, month, day, hours, minutes, seconds, miliseconds )', typeof d5, 'object' );
	test( 'contents of object after d = new Date( 2001, 07, 17, 14, 13, 01, 02 )', d5.getFullYear() + '' + d5.getMonth() + '' + d5.getDate() + '' + d5.getHours() + '' + d5.getMinutes() + '' + d5.getSeconds() + '' + d5.getMilliseconds(), '2001717141312' );

	/* Testing that NaN can be used */
	d6 = new Date( NaN, NaN, NaN, NaN, NaN, NaN, NaN );  // Might crash here :-)
	d6.setMonth(NaN);
	d6.setFullYear(NaN);

	/* Regression #144624: if the date string contains no information,
	   then return NaN as the date value, not the current time.
	   Do this for the sake of compatibility with MSIE and Mozilla.  */
	d7 = new Date('   ');
	test( 'date constructor without information should return NaN #1', isNaN(d7.getTime()), true );
	test( 'date constructor without information should return NaN #2', String(d7), "NaN" );
    }
    catch( e )
    {
	exception( e );
    }
}


function testDateProperties( windowObject )
{
    try {
	tdef( "Date.length", Date.length );
	tdef( "Date.prototype", Date.prototype );
	tdef( "Date.parse", Date.parse );
	tdef( "Date.UTC", Date.UTC );
	tdef( "Date.prototype.constructor", Date.prototype.constructor );
	tdef( "Date.prototype.toString", Date.prototype.toString );
	tdef( "Date.prototype.toDateString", Date.prototype.toDateString );
	tdef( "Date.prototype.toTimeString", Date.prototype.toTimeString );
	tdef( "Date.prototype.toLocaleString", Date.prototype.toLocaleString );
	tdef( "Date.prototype.toLocaleDateString", Date.prototype.toLocaleDateString );
	tdef( "Date.prototype.toLocaleTimeString", Date.prototype.toLocaleTimeString );
	tdef( "Date.prototype.valueOf", Date.prototype.valueOf );
	tdef( "Date.prototype.getTime", Date.prototype.getTime );
	tdef( "Date.prototype.getFullYear", Date.prototype.getFullYear );
	tdef( "Date.prototype.getUTCFullYear", Date.prototype.getUTCFullYear );
	tdef( "Date.prototype.getMonth", Date.prototype.getMonth );
	tdef( "Date.prototype.getUTCMonth", Date.prototype.getUTCMonth );
	tdef( "Date.prototype.getDate", Date.prototype.getDate );
	tdef( "Date.prototype.getUTCDate", Date.prototype.getUTCDate );
	tdef( "Date.prototype.getDay", Date.prototype.getDay );
	tdef( "Date.prototype.getUTCDay", Date.prototype.getUTCDay );
	tdef( "Date.prototype.getHours", Date.prototype.getHours );
	tdef( "Date.prototype.getUTCHours", Date.prototype.getUTCHours );
	tdef( "Date.prototype.getMinutes", Date.prototype.getMinutes );
	tdef( "Date.prototype.getUTCMinutes", Date.prototype.getUTCMinutes );
	tdef( "Date.prototype.getSeconds", Date.prototype.getSeconds );
	tdef( "Date.prototype.getUTCSeconds", Date.prototype.getUTCSeconds );
	tdef( "Date.prototype.getMilliseconds", Date.prototype.getMilliseconds );
	tdef( "Date.prototype.getUTCMilliseconds", Date.prototype.getUTCMilliseconds );
	tdef( "Date.prototype.getTimezoneOffset", Date.prototype.getTimezoneOffset );
	tdef( "Date.prototype.setTime", Date.prototype.setTime );
	tdef( "Date.prototype.setMilliseconds", Date.prototype.setMilliseconds );
	tdef( "Date.prototype.setUTCMilliseconds", Date.prototype.setUTCMilliseconds );
	tdef( "Date.prototype.setSeconds", Date.prototype.setSeconds );
	tdef( "Date.prototype.setUTCSeconds", Date.prototype.setUTCSeconds );
	tdef( "Date.prototype.setMinutes", Date.prototype.setMinutes );
	tdef( "Date.prototype.setUTCMinutes", Date.prototype.setUTCMinutes );
	tdef( "Date.prototype.setHours", Date.prototype.setHours );
	tdef( "Date.prototype.setUTCHours", Date.prototype.setUTCHours );
	tdef( "Date.prototype.setDate", Date.prototype.setDate );
	tdef( "Date.prototype.setUTCDate", Date.prototype.setUTCDate );
	tdef( "Date.prototype.setMonth", Date.prototype.setMonth );
	tdef( "Date.prototype.setUTCMonth", Date.prototype.setUTCMonth );
	tdef( "Date.prototype.setFullYear", Date.prototype.setFullYear );
	tdef( "Date.prototype.setUTCFullYear", Date.prototype.setUTCFullYear );
	tdef( "Date.prototype.toUTCString", Date.prototype.toUTCString );
    }
    catch( e ) { exception( e ); }
}

function testing()
{
    try
    {
	var d1 = new Date( 2001, 0, 0 );
	var d2 = new Date( 2001, 6, 2 );
	var d3 = new Date( 2001, 11, 31 );
	var diff = Math.floor( ( d2.getTime() - d1.getTime() ) / ( 1000 * 60 * 60 * 24 ) ) + 1;
	var diff2 = Math.floor( ( d3.getTime() - d1.getTime() ) / ( 1000 * 60 * 60 * 24 ) );
	show( diff % 7 );
    }
    catch( e )
    {
	exception( e );
    }
}


function testDateGetMethods( windowObject )
{
   try
   {
       var d = new Date();
       var d2 = new Date( 2001, 0, 0 );
       var dateForGetDateTest = new Date( 2008, 5, 4 );
       var dateForTZOffsetTest = new Date( '2008-07-21 08:35 GMT' ); // should be parsed GMT 08:35 on July 21st 2008
      /*** getDate() ***/
      test( 'typeof getDate()', typeof dateForGetDateTest.getDate(), 'number' );
      test( 'getDate()', dateForGetDateTest.getDate(), 4 );

      /*** getDay() ***/
      test( 'typeof getDay()', typeof d.getDay(), 'number' );

         /**
          * 1000-milliseconds, 60-seconds, 60-minutes, 24-hours = days,
          * 'mill' is days since New Year 2001 in milliseconds,
          * modulus 7 is to get the day of the week number
          */
      var mill = d.getTime() - (new Date('2001-01-01 00:00 '+getTimezone(new Date()))).getTime();
      dayoftheweek= (( Math.floor( mill / ( 1000 * 60 * 60 * 24 ) ) ) % 7) + 1; // adds one because 2001-01-01 was a Monday
      if(dayoftheweek==7)dayoftheweek=0; // just to hard-code that day numbers in this API start on 0
      test( 'getDay() #1', d.getDay(), dayoftheweek );
      test( 'getDay() specific date in the past', (new Date('2005-03-13 11:00 GMT')).getDay(), 0 );

      if( isNaN( d.getDay() ) || d.getDay() < 0 || d.getDay() > 6 )
      {
         test( 'getDay() #2', d.getDay(), 'integer between 0 and 6' );
      }

      /*** getFullYear() ***/
      var dateForGetFullYearTest = new Date( 2006, 01, 01 );
      test( 'typeof getFullYear()', typeof d.getFullYear(), 'number' );
         // assuming that the system clock is >= year 2000
      test( 'getFullYear()', dateForGetFullYearTest.getFullYear(), 2006 );

      /*** getMilliseconds() ***/
      test( 'getMilliseconds() #1', typeof d.getMilliseconds(), 'number' );

      if( isNaN( d.getMilliseconds() ) || d.getMilliseconds() > 999 || d.getMilliseconds() < 0 )
      {
         test( 'getMilliseconds() #2', d.getMilliseconds(), 'integer between 0 and 999' );
      }

      /*** getMinutes() ***/
      test( 'typeof getMinutes()', typeof d.getMinutes(), 'number' );
      test( 'getMinutes() #1', d.getMinutes(), d.toString().substring( d.toString().indexOf( 'GMT' ) - 6, d.toString().indexOf( 'GMT' ) - 4  ) );

      if( isNaN( d.getMinutes() ) || d.getMinutes() > 59 || d.getMinutes() < 0 )
      {
         test( 'getMinutes() #2', d.getMinutes(), 'integer between 0 and 59' );
      }

      /*** getMonth() ***/
      test( 'typeof getMonth()', typeof d.getMonth(), 'number' );

      if( isNaN( d.getMonth() ) || d.getMonth() > 11 || d.getMonth() < 0 )
      {
         test( 'getMonth()', d.getMonth(), 'integer between 0 and 11' );
      }

      /*** getSeconds() ***/
      test( 'typeof getSeconds()', typeof d.getSeconds(), 'number' );
      test( 'getSeconds() #1', d.getSeconds(), d.toString().substring( d.toString().indexOf( 'GMT' ) - 3, d.toString().indexOf( 'GMT' ) - 1  ) );

      if( isNaN( d.getSeconds() ) || d.getSeconds() > 59 || d.getSeconds() < 0 )
      {
         test( 'getSeconds() #2', d.getSeconds(), 'integer between 0 and 59' );
      }

      /*** getTime() ***/
      test( 'getTime()', typeof d.getTime(), 'number' );

      /*** getTimezoneOffset() ***/
      test( 'typeof getTimezoneOffset()', typeof d.getTimezoneOffset(), 'number' );
         // divides by 60 to get offset in hours
      test( 'getTimezoneOffset()', dateForTZOffsetTest.getTimezoneOffset() / 60, dateForTZOffsetTest.getUTCHours() - dateForTZOffsetTest.getHours() );

      /*** getUTCDate() ***/
      test( 'typeof getUTCDate()', typeof d.getUTCDate(), 'number' );
      test( 'getUTCDate() #1', dateForTZOffsetTest.getUTCDate(), 21 );

      if( isNaN( d.getUTCDate() ) || d.getUTCDate() < 1 || d.getUTCDate() > 31 )
      {
         test( 'getUTCDate() #2', d.getUTCDate(), 'integer between 1 and 31' );
      }

      /*** getUTCDay() ***/
      test( 'typeof getUTCDay()', typeof d.getUTCDay(), 'number' );
      test( 'getUTCDay() #1', dateForTZOffsetTest.getUTCDay(), 1 );

      if( isNaN( d.getUTCDay() ) || d.getUTCDay() < 0 || d.getUTCDay() > 6 )
      {
         test( 'getUTCDay() #2', d.getUTCDay(), 'integer between 0 and 6' );
      }

      /*** getUTCFullYear() ***/
      test( 'typeof getUTCFullYear()', typeof d.getUTCFullYear(), 'number' );
      test( 'correctness getUTCFullYear()', dateForTZOffsetTest.getUTCFullYear(), 2008 );

      if( isNaN( d.getUTCFullYear() ) || d.getUTCFullYear() < 0 )
      {
         test( 'getUTCFullYear()', d.getUTCFullYear(), 'integer greater or equal to 0' );
      }

      /*** getUTCHours() ***/
      test( 'typeof getUTCHours()', typeof d.getUTCHours(), 'number' );
      test( 'getUTCHours() #1', dateForTZOffsetTest.getUTCHours(), 8 );

      if( isNaN( d.getUTCHours() ) || d.getUTCHours() < 0 )
      {
         test( 'getUTCHours() #2', d.getUTCHours(), 'integer greater or equal to 0' );
      }

      /*** getUTCMilliseconds() ***/
      test( 'typeof getUTCMilliseconds()', typeof d.getUTCMilliseconds(), 'number' );
      test( 'getUTCMilliseconds() #1', d.getUTCMilliseconds(), d.getMilliseconds() );

      if( isNaN( d.getUTCMilliseconds() ) || d.getUTCMilliseconds() < 0 || d.getUTCMilliseconds() > 999 )
      {
         test( 'getUTCMilliseconds() #2', d.getUTCMilliseconds(), 'integer between 0 and 999' );
      }

      /*** getUTCMinutes() ***/
      test( 'typeof getUTCMinutes()', typeof d.getUTCMinutes(), 'number' );
      test( 'getUTCMinutes()', dateForTZOffsetTest.getUTCMinutes(), 35 );

      if( isNaN( d.getUTCMinutes() ) || d.getUTCMinutes() < 0 || d.getUTCMinutes() > 59 )
      {
         test( 'getUTCMinutes()', d.getUTCMinutes(), 'integer between 0 and 59' );
      }

      d = new Date( 'July 23, 2001 11:37:00' );
      test( 'getMinutes()', d.getMinutes(), 37 );

      /*** getUTCMonth() ***/
      test( 'typeof getUTCMonth()', typeof d.getUTCMonth(), 'number' );
      test( 'getUTCMonth() #1', dateForTZOffsetTest.getUTCMonth(), 6 );

      if( isNaN( d.getUTCMonth() ) || d.getUTCMonth() < 0 || d.getUTCMonth() > 11 )
      {
         test( 'getUTCMonth() #2', d.getUTCMonth(), 'integer between 0 and 11' );
      }

      /*** getUTCSeconds() ***/
      test( 'typeof getUTCSeconds()', typeof d.getUTCSeconds(), 'number' );
      test( 'getUTCSeconds() #1', d.getUTCSeconds(), d.getSeconds() );

      if( isNaN( d.getUTCSeconds() ) || d.getUTCSeconds() < 0 || d.getUTCSeconds() > 59 )
      {
         test( 'getUTCSeconds() #2', d.getUTCSeconds(), 'integer between 0 and 59' );
      }

      /*** getYear() ***/
      test( 'type of getYear()', typeof d.getYear(), 'number' );
      test( 'getYear() #1', d.getYear(), d.getFullYear() );

      if( isNaN( d.getYear() ) )
      {
         test( 'getYear() #2', d.getYear(), 'an integer' );
      }
   }
   catch( e )
   {
      exception( e );
   }
}

// When setter methods are called with no arguments, the result will be NaN.
// The spec is clear on this, and Mozilla agrees.
// Older Opera versions do not handle this corner case correctly.

function testDateSetMethods( windowObject )
{
    try
    {
	testSetDate();
	testSetFullYear();
	testSetHours();
	testSetMilliseconds();
	testSetMinutes();
	testSetMonth();
	testSetSeconds();
	testSetTime();
	testSetUTCDate();
	testSetUTCFullYear();
	testSetUTCHours();
	testSetUTCMilliseconds();
	testSetUTCMinutes();
	testSetUTCMonth();
	testSetUTCSeconds();
	test( "Make sure nobody defines d globally", typeof d, "undefined" );
	test( "Make sure nobody defines d2 globally", typeof d2, "undefined" );
	test( "Make sure nobody defines tmp globally", typeof tmp, "undefined" );
    }
    catch (e)
    {
	exception(e);
    }
}

function testSetDate()
{
    var tmp = new Date();
    tmp.setDate();
    test( 'setDate(), empty call',  isNaN(tmp.getDate()), true );

    var d2 = new Date();

    test( 'typeof setDate()', typeof d2.setDate(d2.getDate()), 'number' );
    var olddate = d2.getDate();

    if( olddate == 1 )
    {
	d2.setDate( 2 );
	test( 'setDate #1', d2.getDate(), 2 );
    }
    else
    {
	d2.setDate( 1 );
	test( 'setDate #2', d2.getDate(), 1 );
    }
}

function testSetFullYear()
{
    var d2 = new Date();

    test( 'setFullYear #1', typeof d2.setFullYear(d2.getFullYear()), 'number' );
    var oldfullyear = d2.getFullYear();
    var oldmonth = d2.getMonth();
    var olddate = d2.getDate();

    var tmp = new Date();
    tmp.setFullYear();
    test( 'setFullYear #2, empty call', isNaN(tmp.getFullYear()), true );

    if( oldfullyear == 2001 )
    {
	d2.setFullYear( 2000 );
	test( 'setFullYear #3', d2.getFullYear(), 2000 );
    }
    else
    {
	d2.setFullYear( 2001 );
	test( 'setFullYear #4', d2.getFullYear(), 2001 );
    }
    if( d2.getMonth()==1 && d.getDate()==29 ){ // leap year
        test( 'setFullYear #5', d2.getMonth(), oldmonth+1 );
        test( 'setFullYear #6', d2.getDate(), 1 );
    }else{
        test( 'setFullYear #5', d2.getMonth(), oldmonth );
        test( 'setFullYear #6', d2.getDate(), olddate );
    }

    d2.setFullYear( 2002, 0, 12 );
    test( 'setFullYear #7', d2.getFullYear(), 2002 );
    test( 'setFullYear #8', d2.getMonth(), 0 );
    test( 'setFullYear #9', d2.getDate(), 12 );
    // month = 12, year += 1, month = 1
    d2.setFullYear( 2003, 12, 12 );
    test( 'setFullYear #10', d2.getFullYear(), 2004 );
    test( 'setFullYear #11', d2.getMonth(), 0 );
}

function testSetHours()
{
    var d2 = new Date();

    test( 'setHours #1', typeof d2.setHours(d2.getHours()), 'number' );
    var oldhours = d2.getHours();

    var tmp = new Date();
    tmp.setHours();
    test( 'setHours #2, empty call', isNaN(tmp.getHours()), true );

    if( oldhours == 1 )
    {
	d2.setHours( 23 );
	test( 'setHours #3', d2.getHours(), 23 );
    }
    else
    {
	d2.setHours( 1 );
	test( 'setHours #4', d2.getHours(), 1 );
    }

    test( 'setHours #5', d2.getMinutes(), d2.getUTCMinutes() );
    test( 'setHours #6', d2.getSeconds(), d2.getUTCSeconds() );
    test( 'setHours #7', d2.getMilliseconds(), d2.getUTCMilliseconds() );

    d2.setHours( 2, 59, 49, 390 );
    test( 'setHours #9', d2.getHours(), 2 );
    test( 'setHours #10', d2.getMinutes(), 59 );
    test( 'setHours #11', d2.getSeconds(), 49 );
    test( 'setHours #12', d2.getMilliseconds(), 390 );

    // 100 seconds = 1 minute 20 seconds
    d2.setHours( 3, 22, 100, 340 );
    test( 'setHours #13', d2.getMinutes(), 23 );
    test( 'setHours #14', d2.getSeconds(), 40 );
}

function testSetMilliseconds()
{
    var d2 = new Date();

    test( 'setMilliseconds #1', typeof d2.setMilliseconds(d2.getMilliseconds()), 'number' );
    var oldmilliseconds = d2.getMilliseconds();

    var tmp = new Date();
    tmp.setMilliseconds();
    test( 'setMilliseconds #2, empty call', isNaN(tmp.getMilliseconds()), true  );

    if( oldmilliseconds == 100 )
    {
	d2.setMilliseconds( 200 );
	test( 'setMillseconds #3', d2.getMilliseconds(), 200 );
    }
    else
    {
	d2.setMilliseconds( 300 );
	test( 'setMillseconds #4', d2.getMilliseconds(), 300 );
    }
}

function testSetMinutes()
{
    var d2 = new Date();

    test( 'setMinutes #1', typeof d2.setMinutes(d2.getMinutes()), 'number' );
    var oldminutes = d2.getMinutes();
    var oldseconds = d2.getSeconds();
    var oldmilliseconds = d2.getMilliseconds();

    var tmp = new Date();
    tmp.setMinutes();
    test( 'setMinutes #2, empty call', isNaN(tmp.getMinutes()), true );

    if( oldminutes == 1 )
    {
	d2.setMinutes( 2 );
	test( 'setMinutes #3', d2.getMinutes(), 2 );
    }
    else
    {
	d2.setMinutes( 1 );
	test( 'setMinutes #4', d2.getMinutes(), 1 );
    }

    test( 'setMinutes #5', d2.getSeconds(), oldseconds );
    test( 'setMinutes #6', d2.getMilliseconds(), oldmilliseconds );
    // JS < 1.3 has only the one argument version above.
    d2.setMinutes( 3, 20, 200 );
    test( 'setMinutes( minutes, seconds, milliseconds ) #1', d2.getMinutes(), 3 );
    test( 'setMinutes( minutes, seconds, milliseconds ) #2', d2.getSeconds(), 20 );
    test( 'setMinutes( minutes, seconds, milliseconds ) #3', d2.getMilliseconds(), 200 );
}

function testSetMonth()
{
    var d2 = new Date();

    test( 'typeof setMonth()', typeof d2.setMonth(d2.getMonth()), 'number' );
    var oldmonth = d2.getMonth();
    var olddate = d2.getDate();

    var tmp = new Date();
    tmp.setMonth();
    test( '1: setMonth(), empty call', isNaN(tmp.getMonth()), true );

    if( oldmonth == 1 )
    {
        // make sure you set the month to a 31-day mont, otherwise the call may fail:
        d2.setMonth( 2 );
        test( '2: setMonth( month )', d2.getMonth(), 2 );
    }
    else
    {
        // make sure you set the month to a 31-day mont, otherwise the call may fail:
        d2.setMonth( 4 );
        test( '3: setMonth( month ) ==> ' + d2.getMonth(), d2.getMonth(), 4 );
    }

    test( '4: setMonth( month ) ==> ' + d2.getDate(), d2.getDate(), olddate );

    // JS < 1.3 has only the one argument version above.
    d2.setMonth( 3, 23 );
    test( '5: setMonth( month, date )', d2.getMonth(), 3 );
    test( '6: setMonth( month, date )', d2.getDate(), 23 );

    d2.setMonth( 4, 32 );
    test( '7: setMonth( month, datetoobig )', d2.getMonth(), 5 );
    test( '8: setMonth( month, datetoobig )', d2.getDate(), 1 );
}

function testSetSeconds()
{
    var d2 = new Date();

    test( 'typeof setSeconds()', typeof d2.setSeconds(d2.getSeconds()), 'number' );
    var oldseconds = d2.getSeconds();
    var oldmilliseconds = d2.getMilliseconds();

    var tmp = new Date();
    tmp.setSeconds();
    test( 'setSeconds(), empty call', isNaN(tmp.getSeconds()), true  );

    if( oldseconds == 1 )
    {
	d2.setSeconds( 2 );
	test( 'setSeconds( seconds ) #1', d2.getSeconds(), 2 );
    }
    else
    {
	d2.setSeconds( 1 );
	test( 'setSeconds( seconds ) #2', d2.getSeconds(), 1 );
    }

    test( 'setSeconds( seconds ) #3', d2.getMilliseconds(), oldmilliseconds );

    // JS < 1.3 has only the one argument version above.
    d2.setSeconds( 3, 200 );
    test( 'setSeconds( seconds, milliseconds ) #1', d2.getSeconds(), 3 );
    test( 'setSeconds( seconds, milliseconds ) #2', d2.getMilliseconds(), 200 );
}

function testSetTime()
{
    var d2 = new Date();

    test( 'setTime()', typeof d2.setTime(), 'number' );
    var d = new Date( 1978, 11, 20 );
    var oldtime = d.getTime();

    var tmp = new Date();
    tmp.setTime();
    test( 'setTime(), empty call', isNaN(tmp.getTime()), true );  // undefined => NaN, timeclip(NaN) => NaN

    d = new Date( 1978, 11, 20 );

    d2.setTime( d.getTime() );
    test( 'setTime( timevalue )', d2.getTime(), d.getTime() );

    d2.setTime( -200 );
    // time is set in ms since 1970-01-01 00:00 but *relative to local time*.
    // so 200ms before midnight in Oslo is still in 1970. However, if the time zone offset is >=0, 200ms before midnight is in 1969..
    var expectedYear = ((new Date()).getTimezoneOffset())>=0?1969:1970;
    test( 'setTime( -timevalue )', d2.getFullYear(), expectedYear ); // I suspect this test may (falsely) fail in some timezones or at some times of the year.
}

function testSetUTCDate()
{
    var d2 = new Date();

    test( 'typeof setUTCDate()', typeof d2.setUTCDate(d2.getUTCDate()), 'number' );
    var oldutcdate = d2.getUTCDate();

    if( oldutcdate == 1 )
    {
	d2.setUTCDate( 2 );
	test( 'setUTCDate( date ) #1', d2.getUTCDate(), 2 );
    }
    else
    {
	d2.setUTCDate( 1 );
	test( 'setUTCDate( date ) #2', d2.getUTCDate(), 1 );
    }

    // ensures that the month value has one more to go, since setUTCDate( 32 ) adds one to the month value
    d2.setUTCMonth( 9 );
    var oldutcmonth = d2.getUTCMonth();
    d2.setUTCDate( 32 );
    test( 'setUTCDate( toobigdate ) #1', d2.getUTCDate(), 1 )
	test( 'setUTCDate( toobigdate ) #2', d2.getUTCMonth(), (oldutcmonth + 1) % 12 );
}

function testSetUTCFullYear()
{
    var d2 = new Date();

    test( 'setUTCFullYear()', typeof d2.setUTCFullYear(d2.getUTCFullYear()), 'number' );
    var oldutcfullyear = d2.getUTCFullYear();
    var oldmonth = d2.getUTCMonth();
    var olddate = d2.getUTCDate();

    if( oldutcfullyear == 1990 )
    {
	d2.setUTCFullYear( 1980 );
	test( 'setUTCFullYear( year ) #1', d2.getUTCFullYear(), 1980 );
    }
    else
    {
	d2.setUTCFullYear( 1990 );
	test( 'setUTCFullYear( year ) #2', d2.getUTCFullYear(), 1990 );
    }
    
    if( d2.getUTCMonth()==1 && d.getUTCDate()==29 ){ // leap year
        test( 'setUTCFullYear( year ) #3', d2.getUTCMonth(), oldmonth+1 );
        test( 'setUTCFullYear( year ) #4', d2.getUTCDate(), 1 );
    }else{
        test( 'setUTCFullYear( year ) #3', d2.getUTCMonth(), oldmonth );
        test( 'setUTCFullYear( year ) #4', d2.getUTCDate(), olddate );
    }

    d2.setUTCFullYear( 2000, 11, 01 );
    test( 'setUTCFullYear( year, month, date ) #1', d2.getUTCFullYear(), 2000 );
    test( 'setUTCFullYear( year, month, date ) #2', d2.getUTCMonth(), 11 );
    test( 'setUTCFullYear( year, month, date ) #3', d2.getUTCDate(), 01 );

    d2.setUTCFullYear( 2000, 10, 31 );
    test( 'setUTCFullYear( year, month, toobigdate ) #1', d2.getUTCFullYear(), 2000 );
    test( 'setUTCFullYear( year, month, toobigdate ) #2', d2.getUTCMonth(), 11 );
    test( 'setUTCFullYear( year, month, toobigdate ) #3', d2.getUTCDate(), 1 );

    d2.setUTCFullYear( 2000, 12, 30 );
    test( 'setUTCFullYear( year, toobigmonth, date ) #1', d2.getUTCFullYear(), 2001 );
    test( 'setUTCFullYear( year, toobigmonth, date ) #2', d2.getUTCMonth(), 0 );
    test( 'setUTCFullYear( year, toobigmonth, date ) #3', d2.getUTCDate(), 30 );
}

function testSetUTCHours()
{
    var d2 = new Date();

    test( ' typeof setUTCHours()', typeof d2.setUTCHours(d2.getUTCHours()), 'number' );
    var oldutchours = d2.getUTCHours();
    var oldutcminutes = d2.getUTCMinutes();
    var oldutcseconds = d2.getUTCSeconds();
    var oldutcmilliseconds = d2.getUTCMilliseconds();

    if( oldutchours == 1 )
    {
	d2.setUTCHours( 2 );
	test( 'setUTCHours( hours ) #1', d2.getUTCHours(), 2 );
    }
    else
    {
	d2.setUTCHours( 1 );
	test( 'setUTCHours( hours ) #2', d2.getUTCHours(), 1 );
    }

    test( 'setUTCHours( hours ) #3', d2.getUTCMinutes(), oldutcminutes );
    test( 'setUTCHours( hours ) #4', d2.getUTCSeconds(), oldutcseconds );
    test( 'setUTCHours( hours ) #5', d2.getUTCMilliseconds(), oldutcmilliseconds );

    d2.setUTCHours(  1, 2, 30, 400 );
    test( 'setUTCHours( hours, minutes, seconds, milliseconds ) #1', d2.getUTCMinutes(), 2 );
    test( 'setUTCHours( hours, minutes, seconds, milliseconds ) #2', d2.getUTCSeconds(), 30 );

    test( 'setUTCHours( hours, minutes, seconds, milliseconds ) #3', d2.getUTCMilliseconds(), 400 );

    d2.setUTCHours(  1, 2, 60, 1000 );
    test( 'setUTCHours( hours, minutes, toomanyseconds, milliseconds ) #1', d2.getUTCMinutes(), 3 );
    test( 'setUTCHours( hours, minutes, toomanyseconds, milliseconds ) #2', d2.getUTCSeconds(), 1 );
    test( 'setUTCHours( hours, minutes, toomanyseconds, milliseconds ) #3', d2.getUTCMilliseconds(), 0 );
}

function testSetUTCMilliseconds()
{
    var d2 = new Date();

    test( 'typeof setUTCMilliseconds()', typeof d2.setUTCMilliseconds(d2.getUTCMilliseconds()), 'number' );
    var oldutcmilliseconds = d2.getUTCMilliseconds();
    var oldutcseconds = d2.getUTCSeconds();

    if( oldutcmilliseconds == 100 )
    {
	d2.setUTCMilliseconds( 200 );
	test( 'setUTCMilliseconds( milliseconds ) #1', d2.getUTCMilliseconds(), 200 );
    }
    else
    {
	d2.setUTCMilliseconds( 100 );
	test( 'setUTCMilliseconds( milliseconds ) #2', d2.getUTCMilliseconds(), 100 );
    }

    d2.setUTCMilliseconds( 1100 );
    test( 'setUTCMilliseconds( toomanymilliseconds ) #3', d2.getUTCSeconds(), (oldutcseconds + 1)%60 );
    test( 'setUTCMilliseconds( toomanymilliseconds ) #4', d2.getUTCMilliseconds(), 100 );
}

function testSetUTCMinutes()
{
    var d2 = new Date();

    test( 'typeof setUTCMinutes()', typeof d2.setUTCMinutes(d2.getUTCMinutes()), 'number' );
    var oldutcminutes = d2.getUTCMinutes();
    var oldutcseconds = d2.getUTCSeconds();
    var oldutcmilliseconds = d2.getUTCMilliseconds();

    if( oldutcminutes == 1 )
    {
	d2.setUTCMinutes( 2 );
	test( 'setUTCMinutes( minutes ) #1', d2.getUTCMinutes(), 2 );
    }
    else
    {
	d2.setUTCMinutes( 1 );
	test( 'setUTCMinutes( minutes ) #2', d2.getUTCMinutes(), 1 );
    }

    test( 'setUTCMinutes( minutes ) #3', d2.getUTCSeconds(), oldutcseconds );

    test( 'setUTCMinutes( minutes ) #4', d2.getUTCMilliseconds(), oldutcmilliseconds );

    d2.setUTCMinutes( 3, 40, 500 );
    test( 'setUTCMinutes( minutes, seconds, milliseconds ) #1', d2.getUTCMinutes(), 3 );
    test( 'setUTCMinutes( minutes, seconds, milliseconds ) #2', d2.getUTCSeconds(), 40 );

    test( 'setUTCMinutes( minutes, seconds, milliseconds ) #3', d2.getUTCMilliseconds(), 500 );

    d2.setUTCMinutes( 3, 70, 500 );
    test( 'setUTCMinutes( minutes, toomanyseconds, milliseconds ) #1', d2.getUTCMinutes(), 4 );
    test( 'setUTCMinutes( minutes, toomanyseconds, milliseconds ) #2', d2.getUTCSeconds(), 10 );

    test( 'setUTCMinutes( minutes, toomanyseconds, milliseconds ) #3', d2.getUTCMilliseconds(), 500 );
}

function testSetUTCMonth()
{
    var d2 = new Date();

    test( 'typeof setUTCMonth()', typeof d2.setUTCMonth(d2.getUTCMonth()), 'number' );
    var oldutcmonth = d2.getUTCMonth();
    var oldutcdate = d2.getUTCDate();
    var oldutcfullyear = d2.getUTCFullYear();

    if( oldutcmonth == 2 )   // March is 2
    {
	d2.setUTCMonth( 4 );  // because May has as many days as March
	test( 'setUTCMonth( month ) #1', d2.getUTCMonth(), 4 );
    }
    else
    {
	d2.setUTCMonth( 2 );   // because March has as many days as any other month
	test( 'setUTCMonth( month ) #2', d2.getUTCMonth(), 2 );
    }

    test( 'setUTCMonth( month ) #3', d2.getUTCDate(), oldutcdate );

    d2.setUTCMonth( 3, 20 );
    test( 'setUTCMonth( month, date ) #1', d2.getUTCMonth(), 3 );
    test( 'setUTCMonth( month, date ) #2', d2.getUTCDate(), 20 );

    d2.setUTCMonth( 2, 32 );
    test( 'setUTCMonth( month, toobigdate ) #1', d2.getUTCMonth(), 3 );
    test( 'setUTCMonth( month, toobigdate ) #2', d2.getUTCDate(), 1 );

    d2.setUTCMonth( 12, 28 );
    test( 'setUTCMonth( toobigmonth, date ) #1', d2.getUTCFullYear(), oldutcfullyear + 1 );
    test( 'setUTCMonth( toobigmonth, date ) #2', d2.getUTCMonth(), 0 );
    test( 'setUTCMonth( toobigmonth, date ) #3', d2.getUTCDate(), 28 );
}

function testSetUTCSeconds()
{
    var d2 = new Date();

    test( 'typeof setUTCSeconds()', typeof d2.setUTCSeconds(d2.getUTCSeconds()), 'number' );
    var oldutcminutes = d2.getUTCMinutes();
    var oldutcseconds = d2.getUTCSeconds();
    var oldutcmilliseconds = d2.getUTCMilliseconds();

    if( oldutcseconds == 1 )
    {
	d2.setUTCSeconds( 2 );
	test( 'setUTCSeconds( seconds ) #1', d2.getUTCSeconds(), 2 );
    }
    else
    {
	d2.setUTCSeconds( 1 );
	test( 'setUTCSeconds( seconds ) #2', d2.getUTCSeconds(), 1 );
    }

    test( 'setUTCSeconds( seconds ) #5', d2.getUTCMilliseconds(), oldutcmilliseconds );

    d2.setUTCSeconds( 3, 200 );
    test( 'setUTCSeconds( seconds, milliseconds ) #6', d2.getUTCSeconds(), 3 );

    test( 'setUTCSeconds( seconds, milliseconds ) #7', d2.getUTCMilliseconds(), 200 );

    d2.setUTCSeconds( 100, 200 );
    test( 'setUTCSeconds( toomanyseconds, milliseconds ) #8', d2.getUTCMinutes(), (oldutcminutes + 1) % 60 );
    test( 'setUTCSeconds( toomanyseconds, milliseconds ) #9', d2.getUTCSeconds(), 40 );

    test( 'setUTCSeconds( seconds, milliseconds ) #10', d2.getUTCMilliseconds(), 200 );
}

function testSetYear()
{
    return;  // Not quite yet

    var d2 = new Date();

    test( 'setYear()', typeof d2.setYear(), 'number' );
    var oldyear = d2.getYear();

    if( oldyear == 2000 )
    {
	d2.setYear( 3000 );
	test( 'setYear( fourdigityear )', d2.getYear(), 3000 - 1900 );
    }
    else
    {
	d2.setYear( 2000 );
	test( 'setYear( fourdigityear )', d2.getYear(), 2000 - 1900 );
    }

    d2.setYear( 96 );
    test( 'setYear( twodigityear )', d2.getYear(), 1996 - 1900 );
}

function testOtherDateMethods( windowObject )
{
   try
   {
      var d3 = new Date();

      /*** toGMTString() ***/
      test( 'typeof toGMTString()', typeof d3.toGMTString(), 'string' );
      test( 'toGMTString()', d3.toGMTString(), d3.toUTCString() );

      /*** toLocaleString() ***/
      test( 'toLocaleString #0', typeof d3.toLocaleString(), 'string' );
      test( 'toLocaleString #1', d3.toLocaleString().length > 6, true );
      test( 'toLocaleString #2', d3.toLocaleString(), d3.toLocaleString() );

      // toSource() is according to Javascript -Programmer's reference & Client Reference JS 1.3 ECMA 262,
      // but it's not mentioned in the ECMA 262 !

      /*** toString() ***/
      test( 'typeof toString()', typeof d3.toString(), 'string' );
      test( 'toString( one_illegal_argument )', d3.toString( 'illegal argumnet' ), d3.toString() );

      /*** toUTCString() ***/
      test( 'typeof toUTCString()', typeof d3.toUTCString(), 'string' );

      if( d3.toUTCString() == d3.toString() )
      {
         test( 'toUTCString()', d3.toUTCString(), 'A string not equalto dateobject.toString()' );
      }

      /*** valueOf() ***/
      test( 'typeof valueOf()', typeof d3.valueOf(), 'number' );
      test( 'valueOf()', d3.valueOf(), d3.getTime() );
   }
   catch( e )
   {
      exception( e );
   }
}

function testDateStaticMethods( windowObject )
{
   try
   {
      var d4 = new Date();
      var d = new Date( 2001, 6, 19, 22, 0, 0 );
      var da = new Date( "Thu, 19 Jul 2001 22:00:00 " + getTimezone(d) );
      var d3 = new Date( 2001, 11, 31 );

      test( 'Date.parse #1', da.toString(), d.toString() );
      test( 'Date.parse #2', Date.parse(d3.toLocaleString()), Date.parse(d3.toLocaleString()) );
      test( 'Date.parse #3', Date.parse(d3.toLocaleString()),
	                     Date.parse(d3.toLocaleString().replace(/\./g,"-")) );
      test( 'Date.parse #1a', new Date(d3.toLocaleString()).getFullYear(), d3.getFullYear() );
      test( 'Date.parse #1b', new Date(d3.toLocaleString()).getMonth(), d3.getMonth() );
      test( 'Date.parse #1c', new Date(d3.toLocaleString()).getDay(), d3.getDay() );
      test( 'Date.parse #1d', new Date(d3.toLocaleString()).getHours(), d3.getHours() );
      test( 'Date.parse #1e', new Date(d3.toLocaleString()).getMinutes(), d3.getMinutes() );
      test( 'Date.parse #1f', new Date(d3.toLocaleString()).getSeconds(), d3.getSeconds() );

      /*** Date.UTC() ***/
      var thisyear = d4.getUTCFullYear();
      var thismonth = d4.getUTCMonth();
      var thisdate = d4.getUTCDate();
      var thishour = d4.getUTCHours();
      var thisminute = d4.getUTCMinutes();
      var thissecond = d4.getUTCSeconds();
      var thismillis = d4.getUTCMilliseconds();

      test( 'Date.UTC #1',
	    Date.UTC( thisyear, thismonth, thisdate, thishour, thisminute, thissecond, thismillis ),
	    d4.getTime() );

      d4.setTime( Date.UTC( 99, thismonth, thisdate ) );
      test( 'Date.UTC #2', d4.getFullYear(), 1999 );

      d4.setTime( Date.UTC( 99, 13, thisdate ) );
      test( 'Date.UTC #3', d4.getFullYear(), 2000 );

      d4.setTime( Date.UTC( 99, thismonth, 32 ) );
      if (thismonth+1 < 12)
        test( 'Date.UTC #4', d4.getMonth(), thismonth+1 );
      else
        test( 'Date.UTC #4', d4.getMonth(), 0 );    // Wraparound

      d4.setTime( Date.UTC( -10, thismonth, 32 ) );
      if (thismonth+1 < 12)
        test( 'Date.UTC #5', d4.getFullYear(), -10 );
      else
        test( 'Date.UTC #5', d4.getFullYear(), -9 );

      // Regression
      expect_exception( "Date.parse on zero arguments", Error, function () { Date.parse(); } );

      // Regression
      test( "Date.parse ignores GMT+nnnn",
	    Date.parse("Thu, 19 Jul 2001 22:00:00") == Date.parse("Thu, 19 Jul 2001 22:00:00 GMT+0400"),
	    false );

      // Regression #127241
      var d = new Date;
      if (d.toLocaleString().match(/GMT/))  /* platform dependent whether zone is in localestring */
      {
          var r1 = (/GMT\+([0-9]+)/).exec(d.toLocaleString())[1];
          var r2 = (/GMT\+([0-9]+)/).exec(d.toString())[1];
          test( "Timezone offset makes sense", r1, r2 );
      }
   }
   catch( e )
   {
      exception( e );
   }
}

