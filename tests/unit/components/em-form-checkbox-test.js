import {
  moduleForComponent,
  test
  } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('em-form', 'em-form checkbox', {
  // Specify the other units that are required for this test
  integration: true
});

let someModel = Ember.Object.create({
  userAgree: false,
  errors: Ember.Object.create(),
  validate() {
    var promise = new Ember.RSVP.Promise((resolve) => {
      resolve('ok!');
    });
    return promise;
  }
});

test('a checkbox clicked updates its model', function(assert) {
  assert.expect(1);
  this.set('someModel', someModel);

  this.render(hbs`{{#em-form model=someModel submitButton=false showErrorsOnFocusIn=false}}{{em-checkbox property="userAgree"}}{{/em-form}}`);

  let input = this.$('input');

  Ember.run(() => {
    input.click();
  });

  Ember.run(() => {
    assert.ok(someModel.get('userAgree'), "Checkbox click");
    someModel.set('userAgree', false);
  });
});

test('a checkbox without a label updates data', function(assert) {
  assert.expect(1);
  this.set('someModel', someModel);
  this.render(hbs`{{#em-form model=someModel submitButton=false showErrorsOnFocusIn=true}}Something here: {{em-checkbox property="userAgree"}}{{/em-form}}`);

  Ember.run(() => {
    this.$('input').click();
  });

  Ember.run(() => {
    assert.ok(someModel.get('userAgree'), "Checkbox click");
    // reset model after assertion
    someModel.set('userAgree', false);
  });
});

test('Checkbox renders with custom css', function(assert) {
  this.render(hbs`{{em-checkbox label='My label' elementClass="col-md-6" controlWrapper="col-md-6" labelClass="col-md-4"}}`);

  assert.ok(this.$().find('label').hasClass('col-md-4'), 'Label has correct class');
  assert.ok(this.$().find('input').parent().hasClass('col-md-6'), 'Checkbox parent has correct class');
  assert.ok(this.$().find('input').hasClass('col-md-6'), 'Checkbox input has correct class');
});

test('Checkbox can be disabled', function(assert) {

  this.render(hbs`{{em-checkbox disabled=true}}`);

  assert.ok(this.$().find('input').attr('disabled'), 'checkbox input renders disabled');
});

test('cid correctly sets the id for the checkbox and it\'s label', function(assert) {
  assert.expect(2);
  this.render(hbs`{{em-checkbox label="some label" cid='test-cid'}}`);

  assert.equal(this.$('input').attr('id'), 'test-cid', 'checkbox input has correct id');
  assert.equal(this.$('label').attr('for'), 'test-cid', 'label has correct \'for\'');
});

test('the "for" of the label is the "id" of the checkbox', function(assert) {
  this.render(hbs`{{em-checkbox label="some label" property='test-cid'}}`);

  assert.equal(this.$('input').attr('id'), this.$('label').attr('for'), 'the "for" of the label is not the "id" of the checkbox input');
});

test('Checkbox can be a required field', function(assert) {

  this.render(hbs`{{em-checkbox required=true}}`);

  assert.ok(this.$().find('input').attr('required'), 'checkbox input becomes a required field');
});

test('Checkbox can be autofocused', function(assert) {

  this.render(hbs`{{em-checkbox autofocus=true}}`);

  assert.ok(this.$().find('input').attr('autofocus'), 'checkbox input has autofocus');
});
