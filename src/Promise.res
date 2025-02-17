type t<+'a> = Js.Promise.t<'a>

type _allSettledValue<'a, 'b> = {
  status: [#fulfilled | #rejected],
  value: option<'a>,
  reason: option<'b>,
}

type allSettledValue<'a, 'b> = Fulfilled('a) | Rejected('b)

exception JsError(Js.Exn.t)
external unsafeToJsExn: exn => Js.Exn.t = "%identity"

@new
external make: ((@uncurry (. 'a) => unit, (. 'e) => unit) => unit) => t<'a> = "Promise"

@val @scope("Promise")
external resolve: 'a => t<'a> = "resolve"

@send external then: (t<'a>, @uncurry ('a => t<'b>)) => t<'b> = "then"

@send
external thenResolve: (t<'a>, @uncurry ('a => 'b)) => t<'b> = "then"

@send external finally: (t<'a>, unit => unit) => t<'a> = "finally"

@scope("Promise") @val
external reject: exn => t<_> = "reject"

@scope("Promise") @val
external all: array<t<'a>> => t<array<'a>> = "all"

@scope("Promise") @val
external all2: ((t<'a>, t<'b>)) => t<('a, 'b)> = "all"

@scope("Promise") @val
external all3: ((t<'a>, t<'b>, t<'c>)) => t<('a, 'b, 'c)> = "all"

@scope("Promise") @val
external all4: ((t<'a>, t<'b>, t<'c>, t<'d>)) => t<('a, 'b, 'c, 'd)> = "all"

@scope("Promise") @val
external all5: ((t<'a>, t<'b>, t<'c>, t<'d>, t<'e>)) => t<('a, 'b, 'c, 'd, 'e)> = "all"

@scope("Promise") @val
external all6: ((t<'a>, t<'b>, t<'c>, t<'d>, t<'e>, t<'f>)) => t<('a, 'b, 'c, 'd, 'e, 'f)> = "all"

@send
external _catch: (t<'a>, @uncurry (exn => t<'a>)) => t<'a> = "catch"

let catch = (promise, callback) => {
  _catch(promise, err => {
    // In future versions, we could use the better version:
    /* callback(Js.Exn.anyToExnInternal(e)) */

    // for now we need to bring our own JsError type
    let v = if Js.Exn.isCamlExceptionOrOpenVariant(err) {
      err
    } else {
      JsError(unsafeToJsExn(err))
    }
    callback(v)
  })
}

@scope("Promise") @val
external race: array<t<'a>> => t<'a> = "race"

@scope("Promise") @val
external _allSettled: array<t<'a>> => t<array<_allSettledValue<'a, 'b>>> = "allSettled"

let allSettled = arr =>
  arr
  ->_allSettled
  ->thenResolve(values =>
    values->Js.Array2.map(val =>
      switch val.status {
      | #fulfilled => Fulfilled(val.value->Belt.Option.getUnsafe)
      | #rejected => Rejected(val.reason->Belt.Option.getUnsafe)
      }
    )
  )
